const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);


const DIST_DIR = path.join(__dirname, "dist")
const PORT = 3000;
const app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
});
