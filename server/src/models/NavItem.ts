import { SchemaDefinition } from "mongoose";

class NavItem {
    public constructor(
        public name: string = "",
        public desc: string = "",
        public price: number = 0,
    ) {};

    public getMongooseSchemaDefinition(): SchemaDefinition {
        return {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            desc: {
                type: String,
            },
        };
    }
}

export default NavItem;
