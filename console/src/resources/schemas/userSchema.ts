import { Schema } from "mongoose";
import { UserSchema, userRoleTypes } from "../models/User";
import { minLength, requiredString } from "../validators/string";
import { emailFormat } from "../validators/email";
import { someStringArray } from "../validators/array";

/*
* User schema with validations
* */
const userSchema: UserSchema = {
    forename: {
        type: String,
        required: true,
        validate: [
            {
                validator: (value: any) => requiredString(value),
                message: "USER_FORENAME_0",
            },
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
                validator: (value: any) => requiredString(value),
                message: "USER_SURNAME_0",
            },
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
                validator: (value: any) => requiredString(value),
                message: "USER_EMAIL_0",
            },
            {
                validator: (value: any) => emailFormat(value),
                message: "USER_EMAIL_1",
            },
        ],
    },
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator: (value: any) => requiredString(value),
                message: "USER_PASSWORD_0",
            },
            {
                validator: (value: any) => minLength(value, 6),
                message: "USER_PASSWORD_1",
            },
        ],
    },
    agreement: {
        type: Boolean,
        required: true,
        default: false,
        validate: [
            {
                validator: (value: any) => value === true,
                message: "USER_AGREEMENT_0",
            },
        ]
    },
    role: {
        type: String,
        required: true,
        enum: userRoleTypes,
        default: "WAITER",
        validate: [
            {
                validator: (value: any) => someStringArray(value, userRoleTypes),
                message: "USER_ROLE_0",
            },
        ]
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

export default userSchema;
