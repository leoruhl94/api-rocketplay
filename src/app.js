const express =  require('express')
const morgan = require('morgan');
const routes =  require('./Routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const server= express();



server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan('tiny'));
server.use(cors({
    // origin: config.corsWhiteList || !origin,
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authortization'],
}))
server.use('/', routes);
server.use(errorHandler);


server.get('/active', (req, res) => {
    return res.json('Hello, we are up and running!')
})
module.exports = server