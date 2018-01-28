var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    entry: {
        'app': "./src/js/app.js",
        'contentfilter': "./src/js/contentFilter.js",
        'heatmap': "./src/js/heatMap.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js",
    }, 
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'contentfilter.html',
            template: 'src/contentfilter.html',
            chunks: ['contentfilter']
        }),
        new HtmlWebpackPlugin({
            filename: 'heatmap.html',
            template: 'src/heatmap.html',
            chunks: ['heatmap']
        }),
        new CleanWebpackPlugin(['dist'])
    ], externals: {
        firebase: "firebase"
    }
};