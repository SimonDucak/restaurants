import { Schema } from "mongoose";
import { CompanySchema } from "../models/Company";
import { minLength, requiredString } from "../validators/string";


/*
* User schema with validations
* */
const companySchema: CompanySchema = {
    name: {
        type: String,
        required: true,
        validate: [
            {
                validator: (value: any) => requiredString(value),
                message: "COMPANY_NAME_0",
            },
            {
                validator: (value: any) => minLength(value, 2),
                message: "COMPANY_NAME_1"
            }
        ]
    },
    menu: {
        type: Object,
        required: false,
        default: {
            menuSections: [],
        }
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Orders",
        },
    ],
    tables: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tables",
        },
    ],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
};

export default companySchema;
