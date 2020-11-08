import { Menu } from "./Menu";
import { UserRes } from "./User";
import { OrderRes } from "./Order";
import { TableRes } from "./Table";
import {
    StringSchemaProperty, DateSchemaProperty, ObjectIDSchemaProperty, ObjectSchemaProperty
} from "../mongooseTypes";

export interface CompanySchema {
    name: StringSchemaProperty | string;
    users: ObjectIDSchemaProperty[] | string[];
    orders: ObjectIDSchemaProperty[] | string[];
    tables: ObjectIDSchemaProperty[] | string[];
    menu: ObjectSchemaProperty<Menu> | Menu;
    createdAt: DateSchemaProperty | Date;
}

export class Company implements CompanySchema {
    public constructor(
        public name: string = "",
        public users: string[] = [],
        public orders: string[] = [],
        public tables: string[] = [],
        public menu: Menu = new Menu(),
        public createdAt: Date = new Date(),
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
