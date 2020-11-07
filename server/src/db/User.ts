import { hash, compare } from "bcrypt";
import { NextFunction } from "express";
import { User } from "../resources/models/User";
import { Schema, Model, model, Document, SchemaDefinition } from "mongoose";
import userSchema from "../resources/schemas/userSchema";
import {ExtendedError} from "../error";

const saltRounds: number = 10;

export interface UserMongoose extends User, Document {
    comparePassword: (string) => boolean;
}

/*
* User schema init
* */
// @ts-ignore
const UserMongooseSchema: Schema = new Schema(userSchema as SchemaDefinition);

/*
* User pre save hook.
* Before save hash password.
* */
UserMongooseSchema.pre("save", async function(next: NextFunction): Promise<void> {
    try {
        const document: UserMongoose = this as UserMongoose;
        if (this.isNew) document.password = await hash(document.password, saltRounds);
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
        console.log(e);
        next(new ExtendedError("Incorrect email or password", 400));
    }
};

/*
* Init mongoose model
* */
const MongooseModel: Model<UserMongoose> = model<UserMongoose>("User", UserMongooseSchema);

export default MongooseModel;
