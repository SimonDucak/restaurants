import { Schema, SchemaDefinition } from "mongoose";
import { minLength } from "../validators/string";
import Address from "./Address";
import Menu from "./Menu";
import Table from "./Table";

class Company {
    public orders: [] = [];
    public users: [] = [];

    public constructor(
        public name: string = "",
        public address: Address = new Address(),
        public desc: string = "",
        public menu: Menu[] = [],
        public tables: Table[] = [],
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
                    type: Schema.Types.ObjectId,
                    ref: "Users",
                },
            ],
        }
    }
}

export default Company;
