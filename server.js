"use strict";

var express = require("express");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require("./webpack.config.js");

var app = express();
var compiler = webpack(webpackConfig);

app.set("views", __dirname + "/src/views");
app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index");
})

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: "bundle.js",
    publicPath: "/build/",
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
}));

app.use(express.static(__dirname + "/build"));

var server = app.listen(3005, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Game of life listening at http://${host}:${port}`);
});
