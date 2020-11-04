// import { RequestHandler, Request, Response, NextFunction } from "express";
// import { IUserMongooseModel } from "../db/User";
// import { ICompanyMongooseModel } from "../db/Company";
// import { ICompanyUserRef, TCompanyUserRoles } from "../models/Company";
// import DB from "../db/";
// import { ExtendedError } from "../error/error";
// import { verifyUser } from "./auth";
//
// /*
// * Admin and God role has a access
// * */
// export const adminRequired: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         // Verify user
//         const verifyResult: true | ExtendedError = await verifyUser(req);
//         if (verifyResult instanceof ExtendedError) return next(verifyResult);
//         // Check if user is GOD
//         const { verifiedUser }: { verifiedUser: undefined | IUserMongooseModel } = req.body;
//         if (verifiedUser && verifiedUser.role === "GOD") return next();
//         // Try find a company
//         const foundCompany: ICompanyMongooseModel | undefined = await DB.Company.findById(req.params.comapny_id);
//         if (!foundCompany) return next(new ExtendedError("Company not found.", 404));
//         // Try find user by ID in company users ID
//         const foundUser: ICompanyUserRef | undefined = foundCompany.users.find((user: ICompanyUserRef) => {
//             return user._id === verifiedUser._id;
//         });
//         if (!foundUser) return next(new ExtendedError("You haven't access on this company.", 401));
//         // Check if found user has ADMIN role
//         if (foundUser.role !== "ADMIN") return next(new ExtendedError("You haven't access for that.", 401));
//         return next();
//     } catch (e) {
//         next(e);
//     }
// };
//
// /*
// * Admin and God role has a access
// * */
// export const waiterRequired: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         // Verify user
//         const verifyResult: true | ExtendedError = await verifyUser(req);
//         if (verifyResult instanceof ExtendedError) return next(verifyResult);
//         // Check if user is GOD
//         const { verifiedUser }: { verifiedUser: undefined | IUserMongooseModel } = req.body;
//         if (verifiedUser && verifiedUser.role === "GOD") return next();
//         // Try find a company
//         const foundCompany: ICompanyMongooseModel | undefined = await DB.Company.findById(req.params.comapny_id);
//         if (!foundCompany) return next(new ExtendedError("Company not found.", 404));
//         // Try find user by ID in company users ID
//         const foundUser: ICompanyUserRef | undefined = foundCompany.users.find((user: ICompanyUserRef) => {
//             return user._id === verifiedUser._id;
//         });
//         if (!foundUser) return next(new ExtendedError("You haven't access on this company.", 401));
//         // Check if found user has ADMIN role
//         const { role }: { role: TCompanyUserRoles } = foundUser;
//         if (role !== "ADMIN" && role !== "WAITER") return next(new ExtendedError("You haven't access for that.", 401));
//         return next();
//     } catch (e) {
//         next(e);
//     }
// };
