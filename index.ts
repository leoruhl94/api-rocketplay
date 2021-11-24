import  express from 'express';
const {modelDefiners} = require('./src/libs/sequelize');
const app = express();
const {
  PORT = 3002,
} = process.env;



  app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
  })