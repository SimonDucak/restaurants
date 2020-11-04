import { Menu } from "./Menu";
import { UserRes } from "./User";
import { OrderRes } from "./Order";
import { TableRes } from "./Table";

export class Company {
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
export interface CompanyReq extends Omit<Company, "users||orders||tables||createdAt"> {}

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
