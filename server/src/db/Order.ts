// import { Schema, Model, model, Document } from "mongoose";
// import { IOrder } from "./DBInterfaces";
//
// export interface IOrderMongooseModel extends IOrder, Document {}
//
// const orderSchema: Schema = new Schema({
//     table: {
//         type: Object,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },
//     company: {
//         type: Schema.Types.ObjectId,
//         ref: "Company",
//         required: true,
//     },
//     navItems: [
//         {
//             type: Object,
//             required: true,
//         }
//     ],
// });
//
// const Order: Model<IOrderMongooseModel> = model<IOrderMongooseModel>("Order", orderSchema);
//
// export default Order;
