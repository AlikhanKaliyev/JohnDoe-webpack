const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractionPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
    entry:{
        bundle : ['./public_html/assets/vendors/jquery/jquery-3.4.1.slim','./public_html/assets/vendors/jquery/jquery-3.4.1','./public_html/assets/js/johndoe','./public_html/assets/vendors/bootstrap/bootstrap','./public_html/assets/vendors/bootstrap/bootstrap.bundle','./public_html/assets/vendors/bootstrap/bootstrap.affix','./public_html/assets/vendors/isotope/isotope.pkgd'],
        style : ["./public_html/assets/css/johndoe.css","./public_html/assets/scss/johndoe.scss"]
    },
        module: {
        rules:[
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractionPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractionPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    // externals: {
    //     jquery: 'jQuery'
    //   },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `[name].js`
      },
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ],
        minimize:true
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new MiniCssExtractionPlugin({filename:"[name].css"}),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    resolve: {
        alias: {
          jquery: "jquery"
      }
      },
    mode: 'development'
}