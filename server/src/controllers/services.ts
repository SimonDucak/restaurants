import * as emailCheck from "email-check"
import { Request, Response, NextFunction } from "express";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

/*
* Check if email exists
* */
router.post("/email", async (req: Request, res: Response, next: NextFunction): Promise<Response<boolean>> => {
   try {
       const exists: boolean = await emailCheck(req.body.email);
       if (!exists) res.status(400).json(false);
       return res.status(200).json(true);
   } catch (e) {
       next(e);
   }
});

export default router;
