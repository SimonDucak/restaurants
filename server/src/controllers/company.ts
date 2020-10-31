import { Router, Request, Response, NextFunction } from "express";
import { IUserMongooseModel } from "../db/User";
import { ICompanyMongooseModel } from "../db/Company";
import DB from "../db/";
import { getSecretKeys, sanitizeRequest } from "../utils/mongoose";
import {userRequired, verifyUser} from "../middleware/auth";
import { getFullURL } from "../utils/express";
import { queryBuilder } from "../utils/queryBuilder";
import { ExtendedError } from "../error/error";
import { ICompanyUserRef } from "../models/Company";
import { adminRequired } from "../middleware/company";

const router: Router = Router({ mergeParams: true });

/*
* Get data of all companies.
* If user is GOD return full data.
* Else return save data.
* */
router.get(
"/",
async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // Create queries
            const fullURL: string = getFullURL(req);
            const queries: object = queryBuilder(fullURL);
            // Found all companies base on queries
            const foundCompanies: ICompanyMongooseModel[] = await DB.Company.find(queries);
            // Try verified user
            const verifyResult: true | ExtendedError = await verifyUser(req);
            // If user is God return all data
            if (verifyResult && req.body.verifiedUser.role === "GOD") return res.status(200).json(foundCompanies);
            // Return save response
            const companiesSaveData = foundCompanies.map((company: ICompanyMongooseModel) => {
                const { name, address, _id, desc } = company;
                return { _id, name, address, desc };
            });
            return res.status(200).json(companiesSaveData);
        } catch (e) {
            next(e)
        }
    }
);

/*
* Get data of company
* If user is ADMIN of company or GOD return full data
* else return save data.
* */
router.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // Found company by ID
            const company: ICompanyMongooseModel = await DB.Company.findById(req.params.id);
            // Try verified user
            const verifyResult: true | ExtendedError = await verifyUser(req);
            // If user is ADMIN of company or GOD return ful data
            if (verifyResult) {
                const { verifiedUser } = req.body;
                if (verifiedUser.role === "GOD") return res.status(200).json(company);
                else {
                    const foundUserRef: ICompanyUserRef = company.users.find((user: ICompanyUserRef) => {
                        return user._id === verifiedUser._id;
                    });
                    if (foundUserRef.role === "ADMIN") return res.status(200).json(company);
                }
            }
            // Return save response
            const { name, address, _id, desc, menu } = company;
            return res.status(200).json({ name, address, _id, desc, menu });
        } catch (e) {
            next(e);
        }
    }
);

/**
 * Create company and find user by id.
 * Then connect user and company into N:N relationship.
 * User required.
 * */
router.post(
    "/:id",
    userRequired,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Find user by ID
            const foundUser: IUserMongooseModel = await DB.User.findById(req.params.id);
            // Sanitize request
            const secretKeys: string[] = getSecretKeys(DB.Company.schema);
            const data: any = sanitizeRequest(req.body.company, secretKeys);
            // Create company
            const createdCompany: ICompanyMongooseModel = await DB.Company.create(data);
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
    }
);

/*
* Update company.
* Update can only admin of company or God.
* Cannot update secret schema types.
* */
router.put(
    "/:id",
    adminRequired,
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // Sanitize request
            const secretKeys: string[] = getSecretKeys(DB.Company.schema);
            const data: any = sanitizeRequest(req.body.company, secretKeys);
            // Update company
            const updatedCompany: ICompanyMongooseModel = await DB.Company
                .findByIdAndUpdate(req.params.id, data, { new: true });
            return res.status(200).json(updatedCompany);
        } catch (e) {
            next(e)
        }
    }
);

export default router;
