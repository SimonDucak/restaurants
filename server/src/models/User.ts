import { Schema, SchemaDefinition } from "mongoose";
import Company from "./Company";
import { emailFormat } from "../validators/email";
import { minLength } from "../validators/string";

/*
* TODO: ***User Roles - Dangerous***
*  Everyone can change user role through postman.
*  VERY IMPORTANT !!!
* */
export const userRoles = ["GOD", "ADMIN", "WAITER", "NONE"] as const;
export type TUserRoles = typeof userRoles[number];

class User {
    public company: Company = new Company();

    public constructor(
        public email: string = "",
        public password: string = "",
        public role: TUserRoles = "NONE",
        public forename: string = "",
        public surname: string = "",
        public agreement: boolean = false,
    ) {};

    public getMongooseSchemaDefinition(): SchemaDefinition {
        return {
            email: {
                type: String,
                required: true,
                unique: true,
                validate: [
                    {
                        validator: (value: any) => emailFormat(value),
                        message: "USER_EMAIL_1"
                    }
                ]
            },
            password: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                required: true,
                enum: userRoles,
            },
            company:  {
                type: Schema.Types.ObjectId,
                ref: "Company",
            },
            forename: {
                type: String,
                required: true,
                validate: [
                    {
                        validator: (value: any) => minLength(value, 2),
                        message: "USER_FORENAME_1",
                    },
                ]
            },
            surname: {
                type: String,
                required: true,
                validate: [
                    {
                        validator: (value: any) => minLength(value, 2),
                        message: "USER_SURNAME_1",
                    },
                ]
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
        }
    }
}

export default User;
