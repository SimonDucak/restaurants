import { hash, compare } from "bcrypt";
import { NextFunction } from "express";
import { UserSchema, userRoleTypes, User } from "../resources/models/User";
import { Schema, Model, model, Document } from "mongoose";
import { minLength } from "../resources/validators/string";
import { emailFormat } from "../resources/validators/email";

/*
* User schema with validations
* */
export function userSchema(): any {
    const schema: UserSchema = {
        forename: {
            type: String,
            required: true,
            validate: [
                {
                    validator: (value: any) => minLength(value, 2),
                    message: "USER_FORENAME_1",
                },
            ],
        },
        surname: {
            type: String,
            required: true,
            validate: [
                {
                    validator: (value: any) => minLength(value, 2),
                    message: "USER_SURNAME_1",
                },
            ],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [
                {
                    validator: (value: any) => emailFormat(value),
                    message: "USER_EMAIL_1",
                },
            ],
        },
        password: {
            type: String,
            required: true,
        },
        agreement: {
            type: Boolean,
            required: true,
            validate: [
                {
                    validator: (value: any) => value === true,
                    message: "USER_AGREEMENT_1",
                },
            ]
        },
        role: {
            type: String,
            required: true,
            enum: userRoleTypes,
            default: "WAITER",
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
        },
    };
    return schema;
}

/*
* User schema init
* */
const UserMongooseSchema: Schema = new Schema(userSchema());

export interface UserMongoose extends User, Document {}

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
