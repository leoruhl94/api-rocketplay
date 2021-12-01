import express, {Application} from 'express';
import morgan from 'morgan';
import routes from './Routes';
import errorHandler from './middlewares/errorHandler';
import setHeaders from './middlewares/setHeaders';
const server: Application = express();

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan('tiny'));
server.use(setHeaders);
server.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept, Authorization');  
    res.setHeader('Acces-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next()
})
server.use('/', routes);
server.use(errorHandler);

export default server