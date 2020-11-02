import { Request } from "express";

/*
* Returns full URL with protocol host and params
* */
export const getFullURL = (req: Request): string => {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
};
