import { SchemaDefinition } from "mongoose";
import { minLength } from "../validators/string";
import { zipFormat } from "../validators/address";

class Address {
    public constructor(
        public street: string = "",
        public streetNumber: string = "",
        public zip: string = "",
        public city: string = "",
        public state: string = "",
    ) {};

    public getMongooseSchemaDefinition(): SchemaDefinition {
        return {
            street: {
                type: String,
                    required: true,
                    validate: [
                    {
                        validator: (value: any) => minLength(value, 2),
                        message: "COMPANY_STREET_1"
                    }
                ]
            },
            streetNumber: {
                type: String,
                    required: true,
            },
            zip: {
                type: String,
                    required: true,
                    validate: [
                    {
                        validator: (value: any) => zipFormat(value),
                        message: "COMPANY_ZIP_1"
                    }
                ]
            },
            city: {
                type: String,
                    required: true,
                    validate: [
                    {
                        validator: (value: any) => minLength(value, 2),
                        message: "COMPANY_CITY_1"
                    }
                ]
            },
            state: {
                type: String,
                    required: true,
                    validate: [
                    {
                        validator: (value: any) => minLength(value, 2),
                        message: "COMPANY_STATE_1"
                    }
                ]
            },
        };
    }
}

export default Address;
