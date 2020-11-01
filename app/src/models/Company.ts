import { Schema, SchemaDefinition } from "mongoose";
import { minLength } from "../validators/string";
import Address from "./Address";
import Menu from "./Menu";
import Table from "./Table";
import { yesterday } from "../utils/date";

export const companyUserRoles = ["ADMIN", "WAITER", "NONE"] as const;
export type TCompanyUserRoles = typeof companyUserRoles[number];

export const subscriptionType = ["FREE_TRIAL", "DEFAULT", "NONE"] as const;
export type TCompanySubscriptionType = typeof subscriptionType[number];

export interface ICompanyUserRef {
    _id: string;
    role: TCompanyUserRoles;
}

class Company {
    public orders: [] = [];
    public users: ICompanyUserRef[] = [];

    public constructor(
        public name: string = "",
        public address: Address = new Address(),
        public desc: string = "",
        public menu: Menu[] = [],
        public tables: Table[] = [],
        public subscriptionType: TCompanySubscriptionType = "FREE_TRIAL",
        public subscriptionExpiredDate: Date = new Date(),
    ) {};

    public getMongooseSchemaDefinition(): SchemaDefinition {
        return {
            name: {
                type: String,
                required: true,
                validate: [
                    {
                        validator: (value: any) => minLength(value, 2),
                        message: "COMPANY_NAME_1"
                    }
                ]
            },
            desc: {
                type: String,
            },
            subscriptionType: {
                type: String,
                required: true,
                enum: subscriptionType,
                default: "NONE",
                secret: true,
            },
            subscriptionExpiredDate: {
                type: Date,
                required: true,
                default: yesterday(),
                secret: true,
            },
            address: new Address().getMongooseSchemaDefinition(),
            menu: [ new Menu().getMongooseSchemaDefinition() ],
            tables: [ new Table().getMongooseSchemaDefinition() ],
            orders: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Orders",
                },
            ],
            users: [
                {
                    _id: {
                        type: Schema.Types.ObjectId,
                        ref: "Users",
                    },
                    role: {
                        type: String,
                        required: true,
                        enum: companyUserRoles,
                    }
                },
            ],
        }
    }
}

export default Company;
