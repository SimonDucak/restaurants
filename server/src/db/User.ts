import { hash, compare } from "bcrypt";
import { NextFunction } from "express";
import { Schema, Model, model, Document } from "mongoose";
import User from "../models/User"

const saltRounds: number = 10;

export interface IUserMongooseModel extends User, Document {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(new User().getMongooseSchemaDefinition());

// Hash password
UserSchema.pre("save", async function(next: NextFunction): Promise<void> {
    try {
        const document: IUserMongooseModel = this as IUserMongooseModel;
        document.password = await hash(document.password, saltRounds);
        next();
    } catch (e) {
        next(e);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword: string, next: NextFunction): Promise<boolean> {
    try {
        return await compare(candidatePassword, this.password);
    } catch (e) {
        next(e);
    }
};

const UserMongooseModel: Model<IUserMongooseModel> = model<IUserMongooseModel>("User", UserSchema);

export default UserMongooseModel;
