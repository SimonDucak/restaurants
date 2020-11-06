import * as cookie from "cookie";
import { Router, Request, Response, NextFunction } from "express";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import DB from "../db/";
import { UserMongoose } from "../db/User";
import { CompanyMongoose } from "../db/Company";
import { UserRegisterReq, UserRes, User, DecodedToken } from "../resources/models/User"
import { ExtendedError } from "../error";

const router: Router = Router({ mergeParams: true });

/*
* Register user and create company then connect them with Users N:1 Company relationship
* */
/*router.post("/register", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Sanitize user data.
        const { forename, surname, email, password, agreement } = req.body.user as User;
        const userData: UserRegisterReq = { forename, surname, email, password, agreement };
        // Sanitize company data
        const { name, menu } = req.body.company as Company;
        const companyData: CompanyReq = { name, menu };
        // Create user
        const user: UserMongoose | undefined = await DB.User.create(userData as UserMongoose);
        // Create company
        const company: CompanyMongoose | undefined = await DB.Company.create(companyData as CompanyMongoose);
        // Check if company a user exists
        if (!user || !company) return next(new ExtendedError("User or company wasn't save correctly.", 500));
        // Connect with relationship N:1
        user.company = company._id;
        company.users.push(user._id);
        await user.save();
        await company.save();
        // Create token
        const token: string = sign({ id: user._id }, process.env.SECRET_KEY);
        // Set token to cookie header
        res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }));
        // Sanitize and answer "UserRes"
        user.password = undefined;
        const serviceRes: { token: string, user: UserRes, } = { token, user };
        res.status(200).json(serviceRes);
    } catch (e) {
        next(e);
    }
});*/

/*
* Register user and then find company and connect them with Users N:1 Company relationship
* */
router.post("/register/:company_id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Sanitize user data.
        const { forename, surname, email, password, agreement } = req.body.user as User;
        const userData: UserRegisterReq = { forename, surname, email, password, agreement };
        const user: UserMongoose | undefined = await DB.User.create(userData as UserMongoose);
        // Create company
        const company: CompanyMongoose | undefined = await DB.Company.findById(req.params.company_id);
        // Check if company a user exists
        if (!user || !company) return next(new ExtendedError("Something went wrong. Please, try again later.", 500));
        // Connect with relationship N:1
        user.company = company._id;
        company.users.push(user._id);
        await user.save();
        await company.save();
        // Create token
        const token: string = sign({ id: user._id }, process.env.SECRET_KEY);
        // Set token to cookie header
        res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }));
        // Sanitize and answer "UserRes"
        user.password = undefined;
        const serviceRes: { token: string, user: UserRes, } = { token, user };
        res.status(200).json(serviceRes);
    } catch (e) {
        if (e.code === 11000) next(new ExtendedError("This email already exists.", 400));
        else next(new ExtendedError("Something went wrong. Please, try again later.", 500));
    }
});

/*
* Login user
* */
router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
       // Find user by email
       const user: UserMongoose | undefined = await DB.User.findOne({ email: req.body.email });
       // // If user not found return error
       if (!user) {
           next({
               status: 400,
               message: "Incorrect email or password."
           });
       }
       // Compare password with password in request
       const equal: boolean = await user.comparePassword(req.body.password);
       // If req password is equal with password in DB create token and return it with user ID.
       if (equal) {
           // Create token
           const token: string = sign({ id: user._id }, process.env.SECRET_KEY);
           // Set token to cookie header
           res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
               httpOnly: true,
               maxAge: 60 * 60 * 24 * 7 // 1 week
           }));
           // Return user without password
           user.password = undefined;
           res.status(200).json({ user, token });
       } else {
           next({
               status: 400,
               message: "Incorrect email or password."
           });
       }
   } catch (e) {
       next(new ExtendedError("Something went wrong. Please, try again later.", 500))
   }
});
//


/*
* Token service.
* If token exists in cookie find user and returns token with found user.
* else returns http error 404
* */
router.post("/token", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
   try {
       // Parse the cookies on get token cookie
       const cookies = cookie.parse(req.headers.cookie || '');
       const token = cookies.token;
       // Try to verify token
       if (token) {
           const verifyUserByToken: Promise<null | UserRes> = new Promise(async (resolve) => {
               verify(
                   token,
                   process.env.SECRET_KEY,
                   async (err: VerifyErrors, decoded: DecodedToken | undefined
               ): Promise<void> => {
                   if (decoded?.id) {
                       // Try find user by decoded ID
                       const user: UserMongoose | undefined = await DB.User.findById(decoded.id);
                       if (user) {
                           user.password = undefined;
                           resolve(user);
                       }
                       return;
                   }
                   // Token wasn't verified or user wasn't find. Remove token from cookies.
                   res.setHeader('Set-Cookie', cookie.serialize('token', undefined));
                   resolve(null)
               });
           });
           // Wait for result from verifying
           const verifyResult: null | UserRes = await verifyUserByToken;
           // If result is null return http error 404
           if (!verifyResult) return next(new ExtendedError("You haven't access permissions!", 404));
           res.status(200).json(verifyResult);
       } else {
           return next(new ExtendedError("You haven't access permissions!", 403));
       }
   } catch (e) {
       return next(e);
   }
});
export default router;
