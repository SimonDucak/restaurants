import { Request, Response, NextFunction } from "express";

// Error / Not found handlers
export class ExtendedError extends Error {
    status: number = 500;
    constructor(message: string, status?: number) {
        super(message);
        if (status) this.status = status;
        Object.setPrototypeOf(this, ExtendedError.prototype);
    }
}

export const notFoundHandler= (req: Request, res: Response) => {
    return res.status(404).json({
        status: 404,
        message: "Not found!",
    });
};

export const errorHandler = (error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.status || 500).json({
        message: error.message || "Ops! Something went wrong.",
    });
};
