import * as emailCheck from "email-check";
import { Router, Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import DB from "../db/";
import { IUserMongooseModel } from "../db/User";
import User from "../models/User";

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
        // Return token and user ID
        res.status(200).json({ token, _id: user._id })
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
       const user: IUserMongooseModel = await DB.User.findOne({ email: req.body.email });
       // Compare password with password in request
       const equal: boolean = await user.comparePassword(req.body.password);
       // If req password is equal with password in DB create token and return it with user ID.
       if (equal) {
           const token: string = sign({ id: user._id }, process.env.SECRET_KEY);
           res.status(200).json({ _id: user._id, token });
       } else {
           next({
               status: 400,
               message: "Incorrect email or password."
           })
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
       next(e)
   }
});


router.post("/");

export default router;
