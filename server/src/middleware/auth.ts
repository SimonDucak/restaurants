import {
  Request, Response, NextFunction, RequestHandler,
} from "express";
import { verify, VerifyErrors } from "jsonwebtoken";
import { ExtendedError } from "../error";
import { DecodedToken } from "../resources/models/User";
import DB from "../db";
import { UserMongoose } from "../db/User";

/*
* Verify token and returns ID or false
* */
export const verifyToken: Function = async (token: string): Promise<string | false> => {
  const decodedID: Promise<string | false> = new Promise((resolve) => {
      verify(
          token,
          process.env.SECRET_KEY,
          async (err: VerifyErrors, decoded: DecodedToken): Promise<void> => {
              if (!err) resolve(decoded.id);
              else resolve(false);
          }
      )
  });
  // Wait for verified and return result
  return await decodedID;
};

/*
* Logged user required
* */
export const userRequired: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      // Get token from request header
      const token: string = req.headers.authorization.split(" ")[1];
      if (!token) return next(new ExtendedError("You haven't access permissions!", 403));
      // Wait for verify
      const verifyResult: string | false = await verifyToken(token);
      if (!!verifyResult) {
          req.body.verifiedID = verifyResult;
          return next();
      }
      // Add ID to request token
      return next(new ExtendedError("You haven't access permissions!", 403));
  } catch (e) {
      next(e);
  }
};

/*
* Admin required
* */
export const adminRequired: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      // Get token from request header
      const token: string = req.headers.authorization.split(" ")[1];
      if (!token) return next(new ExtendedError("You haven't access permissions!", 403));
      // Wait for verify
      const verifyResult: string | false = await verifyToken(token);
      if (!!verifyResult) {
          // Try find a user in DB
          const user: UserMongoose | undefined = await DB.User.findById(verifyResult);
          if (!user) return next(new ExtendedError("You haven't access permissions!", 403));
          // Add ID to request token
          req.body.verifiedID = verifyResult;
          return user.role === "ADMIN" ? next() : next(new ExtendedError("You haven't access permissions!", 403));
      }
      return next(new ExtendedError("You haven't access permissions!", 403));
  } catch (e) {
      next(e);
  }
};
