import { Schema, Model, model, Document } from "mongoose";
import Company from "../models/Company"

export interface ICompanyMongooseModel extends Company, Document {}

const CompanySchema: Schema = new Schema(new Company().getMongooseSchemaDefinition());

const CompanyMongooseModel: Model<ICompanyMongooseModel> = model<ICompanyMongooseModel>("Company", CompanySchema);

export default CompanyMongooseModel;
