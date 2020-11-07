import * as cookie from "cookie";
import { Router, Request, Response, NextFunction } from "express";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import DB from "../db/";
import { UserMongoose } from "../db/User";
import { CompanyMongoose } from "../db/Company";
import { UserRegisterReq, UserRes, User, DecodedToken, UserUpdateReq } from "../resources/models/User"
import { userRequired } from "../middleware/auth";
// import { Company, CompanyReq } from "../resources/models/Company"
import { ExtendedError } from "../error";
import { hash } from "bcrypt";
// import MailSender, { MailOptions } from "../email/MailSender";

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
       if (!user) return next(new ExtendedError("Incorrect email or password.", 400));
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
       } else next(new ExtendedError("Incorrect email or password.", 400));
   } catch (e) {
       next(new ExtendedError("Something went wrong. Please, try again later.", 500))
   }
});

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
           res.status(200).json({ user: verifyResult, token });
       } else {
           return next(new ExtendedError("You haven't access permissions!", 403));
       }
   } catch (e) {
       return next(new ExtendedError("Something went wrong.", 500))
   }
});

/*
* Update User profile data
* */
router.put("/profile-update", userRequired, async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
   try {
        const userID: string = req.body.verifiedID;
        const { forename, surname } = req.body.user as UserUpdateReq;
        const user: UserMongoose | undefined = await DB.User.findById(userID);
        if (!user) return next(new ExtendedError("Something went wrong.", 500));
        user.forename = forename;
        user.surname = surname;
        await user.save();
        res.status(200).json(true);
   } catch (e) {
       console.log(e);
       return next(new ExtendedError("Something went wrong.", 500))
   }
});

/*
* Update User password
* */
router.put("/password-update", userRequired, async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const userID: string = req.body.verifiedID;
        const user: UserMongoose | undefined = await DB.User.findById(userID);
        if (!user) return next(new ExtendedError("Something went wrong.", 500));
        const comparePassword: boolean = await user.comparePassword(req.body.password);
        if (!comparePassword) return next(new ExtendedError("Password is incorrect.", 500));
        user.password = await hash(req.body.newPassword, 10);
        await user.save();
        res.status(200).json(true);
    } catch (e) {
        console.log(e);
        return next(new ExtendedError("Something went wrong.", 500))
    }
});

/*
* Forgot password request.
* */
// router.post("/forgot-password/request", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//    try {
//        // 1. Find user by email
//        const user: UserMongoose | undefined = await DB.User.findOne({ email: req.body.email });
//        if (!user) {
//            next(new ExtendedError("Email doesn't exists.", 500));
//            return;
//        }
//        // 2. Hash user ID
//        const hashID: string = await hash(String(user._id), 10);
//        // 3. Send message to user email with link to FE application
//        const link: string = `${process.env.CONSOLE_HOST}#/forgot-password?hash=${encodeURI(hashID)}`;
//        const mailOptions: Omit<MailOptions, "from"> = {
//            to: req.body.email,
//            subject: "Reset password",
//            html: `Hello mr. ${user.surname}, <br> for reset password please click <a href="${link}" target="_blank">here</a>`,
//        };
//        await new MailSender(mailOptions).sendMail();
//         // 4. Send http 200
//        res.status(200).json(true);
//    } catch (e) {
//        console.log(e);
//        next(new ExtendedError("Email was't sent successfully.", 500));
//    }
// });

/*
* Reset forgotten password
* */
// TODO:


export default router;
