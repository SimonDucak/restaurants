import { hash, compare } from "bcrypt";
import { NextFunction } from "express";
import { User } from "../resources/models/User";
import { Schema, Model, model, Document, SchemaDefinition } from "mongoose";
import userSchema from "../resources/schemas/userSchema";

/*
* User schema init
* */
// @ts-ignore
const UserMongooseSchema: Schema = new Schema(userSchema as SchemaDefinition);

export interface UserMongoose extends User, Document {
    comparePassword: (string) => boolean;
}

/*
* User pre save hook.
* Before save hash password.
* */
UserMongooseSchema.pre("save", async function(next: NextFunction): Promise<void> {
    try {
        const document: UserMongoose = this as UserMongoose;
        document.password = await hash(document.password, 10);
        next();
    } catch (e) {
        next(e);
    }
});

/*
* User method.
* Compare param password with hash password in DB
* */
UserMongooseSchema.methods.comparePassword = async function(candidatePassword: string, next: NextFunction): Promise<boolean> {
    try {
        return await compare(candidatePassword, this.password);
    } catch (e) {
        next(e);
    }
};

/*
* Init mongoose model
* */
const MongooseModel: Model<UserMongoose> = model<UserMongoose>("User", UserMongooseSchema);

export default MongooseModel;
