import { SchemaTypeOpts } from "mongoose";

export type UserRoleType = "ADMIN" | "WAITER";

/*
* From user schema will be construct a mongoose schema in Database.
* */
export interface UserSchema {
    forename: SchemaTypeOpts<string> | string;
    surname: SchemaTypeOpts<string> | string;
    email: SchemaTypeOpts<string> | string;
    password: SchemaTypeOpts<string> | string;
    role: SchemaTypeOpts<UserRoleType> | UserRoleType;
    company: SchemaTypeOpts<string> | string;
    createdAt: SchemaTypeOpts<Date> | Date;
}

export class User implements UserSchema {
    public constructor(
        public forename: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: UserRoleType,
        public company: string,
        public createdAt: Date,
    ) {}
}

/*
* User response from DB
* */
export interface UserRes extends Omit<User, "password"> {
    _id: string;
}

/*
* User request for register
* */
export interface UserRegisterReq extends Omit<User, "role||company||createdAt"> {}

/*
* User request for login
* */
export interface UserLoginReq {
    email: string;
    password: string;
}
