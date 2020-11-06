import { SchemaTypeOpts, Schema } from "mongoose";
import { Menu } from "./Menu";
import { UserRes } from "./User";
import { OrderRes } from "./Order";
import { TableRes } from "./Table";

const ObjectId = Schema.Types.ObjectId;

export interface CompanySchema {
    name: SchemaTypeOpts<StringConstructor> | string;
    users: SchemaTypeOpts<typeof ObjectId[]> | string[];
    orders: SchemaTypeOpts<typeof ObjectId[]> | string[];
    tables: SchemaTypeOpts<typeof ObjectId[]> | string[];
    menu: SchemaTypeOpts<Object> | Menu;
    createdAt: SchemaTypeOpts<any> | Date;
}

export class Company implements CompanySchema {
    public constructor(
        public name: string,
        public users: string[],
        public orders: string[],
        public tables: string[],
        public menu: Menu,
        public createdAt: Date,
    ) {}
}

/*
* Company create and update request
* */
export interface CompanyReq extends Omit<Company, "users" | "orders" | "tables" | "createdAt"> {}

/*
* Company response
* */
export interface CompanyRes extends Company {
    _id: string;
}

/*
* Company populated response
* */
export interface CompanyPopulatedResponse {
    name: string;
    users: UserRes[],
    orders: OrderRes[],
    tables: TableRes[],
    menu: Menu,
    createdAt: Date,
}
