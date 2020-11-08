import { Router, Request, Response, NextFunction } from "express";
import { adminRequired } from "../middleware/auth";
import { Company, CompanyReq } from "../resources/models/Company";
import DB from "../db/";
import { CompanyMongoose } from "../db/Company";
import { UserMongoose } from "../db/User";
import { ExtendedError } from "../error";

const router: Router = Router({ mergeParams: true });

/*
* Get company data
* */
router.get("/:company_id", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   try {
       const foundCompany: CompanyMongoose | undefined = await DB.Company.findById(req.params.company_id);
       if (!foundCompany) return next(new ExtendedError("Company not found.", 404));
       return res.status(200).json(foundCompany);
   } catch (e) {
       next(new ExtendedError("Something went wrong.", 500));
   }
});

/*
* Get company users
* */
router.get("/users/:company_id", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   try {
       const foundUsers: UserMongoose[] | undefined = await DB.User.find({ company: req.params.company_id });
       if (!foundUsers) return next(new ExtendedError("Something went wrong.", 500));
       return res.status(200).json(foundUsers);
   } catch (e) {
       next(new ExtendedError("Something went wrong.", 500));
   }
});

/*
* Update company only admin has access
* */
router.put("/:company_id", adminRequired, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   try {
       // Get request and sanitize
       const { company }: { company: Company } = req.body;
       const { name, menu } = company;
       const companyReg: CompanyReq = { name, menu };
       // Update company
       const { company_id } = req.params;
       const companyRes: CompanyMongoose | undefined = await DB.Company.findByIdAndUpdate(company_id, companyReg, { new: true });
       if (!companyRes) return next(new ExtendedError("Something went wrong during updating company.", 500));
       return res.status(200).json(companyRes);
   } catch (e) {
       next(new ExtendedError("Something went wrong.", 500));
   }
});

export default router;
