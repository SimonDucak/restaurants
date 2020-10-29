import { RequestHandler, Request, Response, NextFunction } from "express";
import { IUserMongooseModel } from "../db/User";
import { ICompanyMongooseModel } from "../db/Company";
import DB from "../db/";
import { ExtendedError } from "../error/error";

/*
* IMPORTANT
* Use MWs after auth MWs if you want to verify user before.
* */

/*
* Check if verified user is register in company.
* If user's role is God has always access.
* */
export const userInCompany: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { verifiedUser }: { verifiedUser: IUserMongooseModel } = req.body;
        if (verifiedUser.role === "GOD") return next();
        const foundCompany: ICompanyMongooseModel = await DB.Company.findById(req.body.company.id);
        if (foundCompany?.users.every((user: IUserMongooseModel) => user._id !== verifiedUser._id )) {
            return next(new ExtendedError("You haven't access to this company.", 401));
        }
        return next();
    } catch (e) {
        next(e);
    }
};
