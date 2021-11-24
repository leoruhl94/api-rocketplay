import  express from 'express';
const {conn} = require('./src/libs/sequelize');
const app = express();
const {
  PORT = 3000,
} = process.env;


conn.sync().then(() => {
  app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
  })
})