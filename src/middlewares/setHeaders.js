
const cors = require('cors');
const config = require('../config/config')

const setHeaders = ((req, res, next) => {

  cors({
		origin: config.corsWhiteList || !origin,
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	})
  next();
});

module.exports = setHeaders;
