import { Router } from "express";
import CRUDRouter, { defaultCRUDRequestHandlers, ICRUDRequestHandlers } from "../CRUDRouter";
import Company from "../models/Company";
import { adminRequired } from "../middleware/auth";
import { userInCompany } from "../middleware/company";

const router: Router = Router({ mergeParams: true });

// Register CRUD router
const companyCRUDMiddlewares: ICRUDRequestHandlers = {
    ...defaultCRUDRequestHandlers,
    getID: [adminRequired, userInCompany],
    post: [adminRequired, userInCompany],
    put: [adminRequired, userInCompany],
    delete: [adminRequired, userInCompany],
};
CRUDRouter<Company>(router, "Company", companyCRUDMiddlewares);

export default router;
