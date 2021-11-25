import {Response, Request, NextFunction} from 'express';
import cors from 'cors';
const config = require('../config/config')
// import config from '../config/config';
const setHeaders = ((req:Request, res:Response, next:NextFunction) => {
  cors({
		origin: config.cors,
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	})
  next();
});

export default setHeaders;
