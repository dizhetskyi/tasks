var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

console.log(path.resolve(__dirname));

module.exports = {

  entry: [
    path.resolve(__dirname + '/public/js/index.js')
  ],

  output: {
    path: path.resolve(__dirname + '/public/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  postcss: function () {
    return [autoprefixer, precss];
  }

}
