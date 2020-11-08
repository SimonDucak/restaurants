import { Company } from "../resources/models/Company";
import { Schema, Model, model, Document, SchemaDefinition } from "mongoose";
import companySchema from "../resources/schemas/companySchema";

export interface CompanyMongoose extends Company, Document {}


/*
* Company schema with validations
* */

/*
* Company schema init
* */
// @ts-ignore
const CompanyMongooseSchema: Schema = new Schema(companySchema as SchemaDefinition);


/*
* Init mongoose model
* */
const MongooseModel: Model<CompanyMongoose> = model<CompanyMongoose>("Company", CompanyMongooseSchema);

export default MongooseModel;
