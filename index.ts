const {conn} = require('./src/libs/sequelize');
import server from './src/app';
const {
  PORT = 3002,
} = process.env;
  conn.sync({force:true}).then(()=>{
    server.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
  })
})
  
  