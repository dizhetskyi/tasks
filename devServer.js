const express = require('express');
const path = require('path');

const port = 8275;
const app = express();

const server = app.listen(port, () => {
  console.log('running at http://localhost:%s', port);
})


var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));


app.use('/bower', express.static(path.resolve(__dirname + '/bower_components/')));
app.use('/libs', express.static(path.resolve(__dirname + '/node_modules/')));

app.use(express.static(path.resolve(__dirname + '/public/')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'))
})