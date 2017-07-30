var path = require("path");
var webpack = require("webpack");

var config = {
    context: path.join(__dirname, "src"),
    entry: [
        "./main.js",
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    ],
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/build/",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.sass$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, "node_modules"),
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};

module.exports = config;
