var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './public/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
