import { SchemaDefinition } from "mongoose";

class Table {
    public constructor(
        public number: number = 0,
        public disable: boolean = false,
    ) {};

    public getMongooseSchemaDefinition(): SchemaDefinition {
        return {
            number: {
                type: Number,
                required: true,
                unique: true,
            },
            disable: {
                type: Boolean,
                required: true,
            },
        };
    }
}

export default Table;
