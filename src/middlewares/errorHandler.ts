import {Response, Request, NextFunction} from 'express';
interface error {
	status: number;
	message: string;
}
const errorHandler = ((err:error, req:Request, res:Response, next:NextFunction) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
export default errorHandler;
