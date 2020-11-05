import { SchemaTypeOpts, Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const userRoleTypes = ["ADMIN", "WAITER"] as const;
export type UserRoleType = typeof userRoleTypes[number];

/*
* From user schema will be construct a mongoose schema in Database.
* */
export interface UserSchema {
    forename: SchemaTypeOpts<StringConstructor> | string;
    surname: SchemaTypeOpts<StringConstructor> | string;
    email: SchemaTypeOpts<StringConstructor> | string;
    password: SchemaTypeOpts<StringConstructor> | string;
    role: SchemaTypeOpts<any> | UserRoleType;
    company: SchemaTypeOpts<typeof ObjectId> | string;
    createdAt: SchemaTypeOpts<any> | Date;
    agreement: SchemaTypeOpts<BooleanConstructor> | boolean
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
        public agreement: boolean,
    ) {}
}

/*
* User response sent in FE applications
* */
export interface UserRes extends Omit<User, "password"> {
    _id: string;
}

/*
* User request for register
* */
export interface UserRegisterReq extends Omit<User, "role" | "company" | "createdAt"> {}

/*
* User request for login
* */
export interface UserLoginReq {
    email: string;
    password: string;
}

/*
* Decoded token
* */
export interface DecodedToken {
    id: string;
    iat: number;
}
