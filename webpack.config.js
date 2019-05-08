const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry : {
        main: './src/js/main.js',
    },
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/bundle.js' 
    },
    devServer: {
        contentBase : './dist'
    },
    plugins: [
        new CopyPlugin([
            {
              from: './src/css/main.css',
              to: './css',
            //   from: './src/img',
            //   to: './img',
            },
        ]),
        new HtmlWebpack({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
};