import express, {Application} from 'express';
import {Response, Request, NextFunction} from 'express';
//import cookieParser from 'cookie_parser';
import bodyParser from 'body-parser';
//import morgan from 'morgan';
import routes from './Routes';
import errorHandler from './middlewares/errorHandler';
import setHeaders from './middlewares/setHeaders';
const server: Application = express();
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
//server.use(cookieParser());
//server.use(morgan('dev'));
server.use(setHeaders);
server.use('/', routes);
server.get('/', async (req:Request, res:Response, next:NextFunction)=> {
    res.send("gohohoh")
    })
server.use(errorHandler);
export default server;