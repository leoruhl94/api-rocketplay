import express from 'express';
import morgan from 'morgan';
//import routes from './Routes';
//import errorHandler from './middlewares/errorHandler';
//import setHeaders from './middlewares/setHeaders';
const server= express();



server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan('tiny'));
//server.use(setHeaders);
//server.use('/', routes);
//server.use(errorHandler);


server.get('/home', (req, res) => {
    return res.json('Hello, we are up and running!')
})
export default server