const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
    entry: [
        './src/index.js',
        './src/less/index.less',
    ],
    output: {
        path: path.join(__dirname, "../build"),
        filename: "[name].[chunkhash:8].bundle.js",
        chunkFilename: "[name].[chunkhash:8].chunk.js"
    },
    mode: "production",
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader" // transpiling our JavaScript files using Babel and webpack
                }
            },
            {
                test: /\.(less|css)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [{
                    loader: "file-loader", // This will resolves import/require() on a file into a url and emits the file into the output directory.
                    options: {
                        name: "[name].[ext]",
                        outputPath: "assets/"
                    }
                }, ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: ["img:src", ":data-src"],
                        minimize: true
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            },
            chunks: "all"
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    plugins: [
        // CleanWebpackPlugin will do some clean up/remove folder before build
        // In this case, this plugin will remove 'dist' and 'build' folder before re-build again
        new CleanWebpackPlugin(),
        // This plugin will extract all css to one file
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].bundle.css",
            chunkFilename: "[name].[chunkhash:8].chunk.css",
        }),
        // The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        // ComppresionPlugin will Prepare compressed versions of assets to serve them with Content-Encoding.
        // In this case we use gzip
        // But, you can also use the newest algorithm like brotli, and it's supperior than gzip
        new CompressionPlugin({
            algorithm: "gzip"
        }),
        new BrotliPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' }
            ]
        })
    ]
};