import {
    StringSchemaProperty, DateSchemaProperty, ObjectIDSchemaProperty, BooleanSchemaProperty,
} from "../mongooseTypes";

export const userRoleTypes = ["ADMIN", "WAITER"] as const;
export type UserRoleType = typeof userRoleTypes[number];

/*
* From user schema will be construct a mongoose schema in Database.
* */
export interface UserSchema {
    forename: StringSchemaProperty | string;
    surname: StringSchemaProperty | string;
    email: StringSchemaProperty | string;
    password: StringSchemaProperty | string;
    role: StringSchemaProperty | UserRoleType;
    company: ObjectIDSchemaProperty | string;
    createdAt: DateSchemaProperty | Date;
    agreement: BooleanSchemaProperty | boolean
}

export class User implements UserSchema {
    public constructor(
        public forename: string = "",
        public surname: string = "",
        public email: string = "",
        public password: string = "",
        public role: UserRoleType = "WAITER",
        public company: string = "5fa32129a86d03290c6f1721",
        public createdAt: Date = new Date(),
        public agreement: boolean = false,
    ) {}
}

/*
* User RESPONSE
* */
export interface UserRes extends Omit<User, "password"> {
    _id: string;
}

/*
* User register or login RESPONSE
* */
export interface LoginRegisterRes {
    user: UserRes;
    token: string;
}

/*
* User register REQUEST
* */
export interface UserRegisterReq extends Omit<User, "role" | "company" | "createdAt"> {}

/*
* User login REQUEST
* */
export interface UserLoginReq {
    email: string;
    password: string;
}

/*
* User profile data update REQUEST
* */
export interface UserUpdateReq {
    forename: string;
    surname: string;
}

/*
* User password update REQUEST
* */
export interface UserUpdatePasswordRequest {
    password: string;
    newPassword: string;
}


/*
* Decoded token
* */
export interface DecodedToken {
    id: string;
    iat: number;
}
