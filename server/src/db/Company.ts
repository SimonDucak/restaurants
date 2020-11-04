import { CompanySchema, Company } from "../resources/models/Company";
import { Schema, Model, model, Document } from "mongoose";
import { minLength } from "../resources/validators/string";

/*
* Company schema with validations
* */
export function companySchema(): any {
    const schema: CompanySchema = {
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
        menu: {
            type: Schema.Types.ObjectId,
            ref: "Menu",
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
    };
    return schema;
}

/*
* Company schema init
* */
const CompanyMongooseSchema: Schema = new Schema(companySchema());

export interface CompanyMongoose extends Company, Document {}

/*
* Init mongoose model
* */
const MongooseModel: Model<CompanyMongoose> = model<CompanyMongoose>("Company", CompanyMongooseSchema);

export default MongooseModel;
