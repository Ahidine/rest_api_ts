import HttpExceptions from "../Exceptions/HttpExceptions";
import {Response , Request , NextFunction } from "express"
function errorMiddleware(error: HttpExceptions, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    console.log(request.body);
    response
        .status(status)
        .send({
            message,
            status,
        });
}

export default errorMiddleware;

