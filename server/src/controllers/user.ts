import * as cookie from "cookie";
import { Router, Request, Response, NextFunction } from "express";
import DB from "../db/";
import { UserMongoose } from "../db/User";
import { CompanyMongoose } from "../db/Company";
import { UserRegisterReq, UserRes, User } from "../resources/models/User"
import { CompanyReq, Company } from "../resources/models/Company"
import { ExtendedError } from "../error";
import { sign } from "jsonwebtoken";

const router: Router = Router({ mergeParams: true });

/*
* Register user and create company then connect them with Users N:1 Company relationship
* */
// TODO: Create middleware validators
router.post("/register", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
});
//
// /*
// * Login user
// * */
// router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//    try {
//        // Find user by email
//        const user: IUserMongooseModel | null = await DB.User.findOne({ email: req.body.email });
//        // If user not found return error
//        if (!user) {
//            next({
//                status: 400,
//                message: "Incorrect email or password."
//            });
//        }
//        // Compare password with password in request
//        const equal: boolean = await user.comparePassword(req.body.password);
//        // If req password is equal with password in DB create token and return it with user ID.
//        if (equal) {
//            // Create token
//            const token: string = sign({ id: user._id }, process.env.SECRET_KEY);
//            // Set token to cookie header
//            res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
//                httpOnly: true,
//                maxAge: 60 * 60 * 24 * 7 // 1 week
//            }));
//            // Return user without password
//            user.password = undefined;
//            res.status(200).json({ user, token });
//        } else {
//            next({
//                status: 400,
//                message: "Incorrect email or password."
//            });
//        }
//    } catch (e) {
//        next(e)
//    }
// });
//
// /*
// * Check if email exists
// * */
// router.post("/email", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//    try {
//        const exists: boolean = await emailCheck(req.body.email);
//        if (!exists) res.status(400).json(false);
//        res.status(200).json(true);
//    } catch (e) {
//        next(e);
//    }
// });
//
// /*
// * Token service.
// * If token exists in cookie find user and returns token with found user.
// * else returns http error 404
// * */
// router.post("/token", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//    try {
//        // Parse the cookies on get token cookie
//        const cookies = cookie.parse(req.headers.cookie || '');
//        const token = cookies.token;
//        // Try to verify token
//        if (token) {
//            const verifyUserByToken: Promise<null | ILoginRegisterRes> = new Promise(async (resolve) => {
//                verify(
//                    token,
//                    process.env.SECRET_KEY,
//                    async (err: VerifyErrors, decoded: IDecodedToken | undefined
//                ): Promise<void> => {
//                    if (decoded?.id) {
//                        const user: IUserRes | null = await DB.User.findById(decoded.id);
//                        if (user) {
//                            user.password = undefined;
//                            resolve({ user, token });
//                        } else {
//                           // Remove token
//                            res.setHeader('Set-Cookie', cookie.serialize('token', undefined));
//                            resolve(null)
//                        }
//                    } else {
//                        // Remove token
//                        res.setHeader('Set-Cookie', cookie.serialize('token', undefined));
//                        resolve(null)
//                    }
//                });
//            });
//            // Wait for result from verifying
//            const verifyResult: null | ILoginRegisterRes = await verifyUserByToken;
//            // If result is null return http error 404
//            if (!verifyResult) return next(new ExtendedError("You haven't any token!", 404));
//            res.status(200).json(verifyResult);
//        } else {
//            return next(new ExtendedError("You haven't any token!", 404));
//        }
//    } catch (e) {
//        return next(e);
//    }
// });
//
//
// router.post("/");
//
export default router;
