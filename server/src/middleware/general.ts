import { RequestHandler, Request, Response, NextFunction } from "express";
import { ExtendedError } from "../error/error";

/*
* Disable route return 404 Extended Error
* */
export const disableRoute: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    try {
        next(new ExtendedError("Not found!", 404));
    } catch (e) {
        next(e);
    }
};
