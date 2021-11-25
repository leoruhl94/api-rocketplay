
import server from './src/app';

const {
  PORT = 3002,
} = process.env;

  server.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
  })