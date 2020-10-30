import { Router, Request, Response, NextFunction } from "express";
import CRUDRouter, { defaultCRUDRequestHandlers, ICRUDRequestHandlers } from "../CRUDRouter";
import Company from "../models/Company";
import { adminRequired } from "../middleware/company";
import { disableRoute } from "../middleware/general";
import { IUserMongooseModel } from "../db/User";
import { ICompanyMongooseModel } from "../db/Company";
import DB from "../db/";

const router: Router = Router({ mergeParams: true });

// Register CRUD router
const companyCRUDMiddlewares: ICRUDRequestHandlers = {
    ...defaultCRUDRequestHandlers,
    getID: [adminRequired],
    post: [disableRoute],
    put: false,
    delete: [adminRequired],
};
CRUDRouter<Company>(router, "Company", companyCRUDMiddlewares);

/**
 * @param-id - User ID
 * Create company and find user by id.
 * Then connect user and company into N:N relationship.
 * */
router.post("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Find user by ID
        const foundUser: IUserMongooseModel = await DB.User.findById(req.params.id);
        // Create company
        const createdCompany: ICompanyMongooseModel = await DB.Company.create(req.body.company);
        // Create N:N relationship between user and company
        const userRelationPromise: Promise<true> = new Promise(async (resolve) => {
            foundUser.companies.push(createdCompany._id);
            await foundUser.save();
            resolve(true);
        });
        const companyRelationPromise: Promise<true> = new Promise(async (resolve) => {
            createdCompany.users.push({ _id: foundUser._id, role: "ADMIN" });
            await createdCompany.save();
            resolve(true);
        });
        await Promise.all([userRelationPromise, companyRelationPromise]);
        // Return created company
        res.status(200).json(createdCompany);
    } catch (e) {
        next(e);
    }
});

/**
 *  @override CRUD Put request handler.
 *  Reason - User cannot update subscription expired date on his company.
 *  Date can be update only after successfully payment.
 * */
router.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

    } catch (e) {

    }
    res.send("OVERRIDE");
});

export default router;
