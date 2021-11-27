const path = require('path');
// const nodeExternals = require('webpack-node-externals');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './index.ts',
  // mode: NODE_ENV,
  mode: 'production',
  // externals: [nodeExternals()],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)]$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      },
      {
        test: /\.(ts)]$/,
        exclude: /node_modules/,
        use: [
          'ts-loader',
        ]
      }
    ] 
  }
}

