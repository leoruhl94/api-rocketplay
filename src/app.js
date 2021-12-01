const express =  require('express')
const morgan = require('morgan');
const routes =  require('./Routes');
const errorHandler = require('./middlewares/errorHandler');
const setHeaders = require('./middlewares/setHeaders');
const server= express();



server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan('tiny'));
server.use(setHeaders);
server.use('/', routes);
server.use(errorHandler);


server.get('/active', (req, res) => {
    return res.json('Hello, we are up and running!')
})
module.exports = server