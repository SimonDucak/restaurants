import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { Document } from "mongoose";
import DB from "./db";
import { queryBuilder } from "./utils/queryBuilder";
import { getFullURL } from "./utils/express";
import { godRequired } from "./middleware/auth";

export interface ICRUDRequestHandlers {
    get: RequestHandler[] | false;
    getID: RequestHandler[] | false;
    getCount: RequestHandler[] | false;
    post: RequestHandler[] | false;
    put: RequestHandler[] | false;
    delete: RequestHandler[] | false;
}

export const defaultCRUDRequestHandlers: ICRUDRequestHandlers = {
    get: [godRequired],
    getID: [godRequired],
    getCount: [godRequired],
    post: [godRequired],
    put: [godRequired],
    delete: [godRequired],
};

/*
* CRUD Router creates basic routes for mongoose model as GET, POST, PUT, DELETE
* */
export default <T>(router: Router, model: string, middlewares: ICRUDRequestHandlers = defaultCRUDRequestHandlers): Router => {
    /*
    * Get filtered documents base on URL get params.
    * */
    if (middlewares.get) {
        router.get(
        "/",
            ...middlewares.get,
            async (req: Request, res: Response, next: NextFunction
        ): Promise<void> => {
            try {
                const queries = queryBuilder(getFullURL(req));
                const foundDocuments: Document[] = await DB[model].find(queries);
                res.status(200).json(foundDocuments);
            } catch (e) {
                next(e);
            }
        });
    }

    /*
    * Get counts all of documents base on URL get params.
    * */
    if (middlewares.getCount) {
        router.get(
            "/count",
            ...middlewares.getCount,
            async (req: Request, res: Response, next: NextFunction
        ): Promise<void> => {
            try {
                const queries = queryBuilder(getFullURL(req));
                const count: number = await DB[model].countDocuments(queries).exec();
                res.status(200).json(count);
            } catch (e) {
                next(e);
            }
        });
    }

    /*
    * Get document by ID.
    * */
    if (middlewares.getID) {
        router.get(
            "/:id",

            ...middlewares.getID,
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const foundDocument: Document = await DB[model].findById(req.params.id);
                res.status(200).json(foundDocument);
            } catch (e) {
                next(e);
            }
        });
    }

    /*
    * Create document.
    * */
    if (middlewares.post) {
        router.post(
            "/",
            ...middlewares.post,
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const data: T = req.body[model.toLowerCase()];
                const createdDocument: Document = await DB[model].create(data);
                res.status(201).json(createdDocument);
            } catch (e) {
                next(e);
            }
        });
    }

    /*
    * Update document.
    * */
    if (middlewares.put) {
        router.put(
            "/:id",
            ...middlewares.put,
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const data: T = req.body[model.toLowerCase()];
                const updatedDocument: Document = await DB[model].findByIdAndUpdate(req.params.id, data, { new: true });
                res.status(200).json(updatedDocument);
            } catch (e) {
                next(e);
            }
        });
    }

    /*
    * Delete document.
    * */
    if (middlewares.delete) {
        router.delete(
            "/:id",
            ...middlewares.delete,
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const deletedDocument: Document = await DB[model].findByIdAndDelete(req.params.id);
                res.status(200).json(deletedDocument);
            } catch (e) {
                next(e);
            }
        });
    }

    return router;
};
