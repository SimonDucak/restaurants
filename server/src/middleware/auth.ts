import { Request, Response, NextFunction, RequestHandler } from "express";
import { verify, VerifyErrors } from "jsonwebtoken";
import DB from "../db/";
import { ExtendedError } from "../error/error";
import { IUserMongooseModel } from "../db/User";
import { TUserRoles } from "../models/User";

export interface IDecodedToken {
    id: string;
    iat: number;
}

/*
* If User is verified then return true and assign verified user to request.body
* otherwise try to verified token if is not valid token return ExtendedError.
* */
export const verifyUser: Function = async (req: Request): Promise<true | ExtendedError> => {
  if (req?.body?.verifiedUser) return true;
  const verifyPromise: Promise<true | ExtendedError> = new Promise(async (resolve) => {
      if (!req.headers?.authorization) {
          resolve(new ExtendedError("Nice try ;)", 401));
      } else {
          const token: string = req.headers.authorization.split(" ")[1];
          verify(
              token,
              process.env.SECRET_KEY,
              async (err: VerifyErrors, decoded: IDecodedToken | undefined
          ): Promise<void> => {
            if (decoded?.id) {
                const foundUser: IUserMongooseModel = await DB.User.findById(decoded.id);
                if (foundUser) {
                    req.body.verifiedUser = foundUser;
                    resolve(true);
                }
                else resolve(new ExtendedError("User not found!", 404));
            }
            resolve(new ExtendedError("Nice try ;)", 401));
          });
      }
  });
  return await verifyPromise;
};

/*
* Only GOD role has a access
* */
export const godRequired: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const verifyResult: true | ExtendedError = await verifyUser(req);
      if (verifyResult instanceof ExtendedError) return next(verifyResult);
      const { role }: { role: TUserRoles } = req.body.verifiedUser;
      if (role !== "GOD") return next(new ExtendedError("You haven't permissions for that.", 401));
      return next();
  } catch (e) {
      next(e);
  }
};

/*
* Admin and God role has a access
* */
export const adminRequired: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const verifyResult: true | ExtendedError = await verifyUser(req);
        if (verifyResult instanceof ExtendedError) return next(verifyResult);
        const { role }: { role: TUserRoles } = req.body.verifiedUser;
        if (role !== "GOD" && role !== "ADMIN") return next(new ExtendedError("You haven't permissions for that.", 401));
        return next();
    } catch (e) {
        next(e);
    }
};

/*
* Admin and God role has a access
* */
export const waiterRequired: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const verifyResult: true | ExtendedError = await verifyUser(req);
        if (verifyResult instanceof ExtendedError) return next(verifyResult);
        const { role }: { role: TUserRoles } = req.body.verifiedUser;
        if (role !== "GOD" && role !== "ADMIN" && role !== "WAITER") return next(new ExtendedError("You haven't permissions for that.", 401));
        return next();
    } catch (e) {
        next(e);
    }
};
