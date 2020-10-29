import { Router, Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import DB from "../db/";
import { IUserMongooseModel } from "../db/User";

const router: Router = Router({ mergeParams: true });

router.post("/register", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: IUserMongooseModel = await DB.User.create(req.body.user);
        const token: string = sign({ id: user._id }, process.env.SECRET_KEY);
        res.status(200).json({ token, _id: user._id })
    } catch (e) {
        next(e);
    }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
       const user: IUserMongooseModel = await DB.User.findOne({ email: req.body.email });
       const match: boolean = await user.comparePassword(req.body.password);
       if (match) {
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

router.post("/");

export default router;
