import * as emailCheck from "email-check";
import * as cookie from "cookie";
import { Router, Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import DB from "../db/";
import { IUserMongooseModel } from "../db/User";
import User from "../models/User";
import {ExtendedError} from "../error/error";

const router: Router = Router({ mergeParams: true });

/*
* Register user
* */
router.post("/register", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Always change user role on NONE
        const userData: User = {
            ...req.body.user,
            role: "NONE",
        };
        // Create user
        const user: IUserMongooseModel = await DB.User.create(userData);
        // Create token
        const token: string = sign({ id: user._id }, process.env.SECRET_KEY);
        // Set token to cookie header
        res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        }));
        // Return token and user ID
        user.password = undefined;
        res.status(200).json({ user, token })
    } catch (e) {
        next(e);
    }
});

/*
* Login user
* */
router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
       // Find user by email
       const user: IUserMongooseModel | null = await DB.User.findOne({ email: req.body.email });
       console.log(user);
       // If user not found return error
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
       next(e)
   }
});

/*
* Check if email exists
* */
router.post("/email", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
       const exists: boolean = await emailCheck(req.body.email);
       if (!exists) res.status(400).json(false);
       res.status(200).json(true);
   } catch (e) {
       next(e);
   }
});

/*
* Get token
* */
router.post("/token", async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
   try {
       // Parse the cookies on the request
       const cookies = cookie.parse(req.headers.cookie || '');
       // Get the visitor name set in the cookie
       const token = cookies.token;
       // Returns token or 403 http status
       if (!token) return next(new ExtendedError("You haven't any token!", 403));
       res.status(200).json(token);
   } catch (e) {
       return next(e);
   }
});


router.post("/");

export default router;
