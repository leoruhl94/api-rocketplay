const server = require('./src/app.js');

const {
  PORT = 3002,
} = process.env;

  server.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
  })