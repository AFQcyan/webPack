const path = require('path');
const TerserWebPackPlugin = require('terser-webpack-plugin')
const { emitWarning } = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {//exports 여야 함
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean: true//기존꺼 지우고 삭제 true
    },
    devtool: 'source-map',//원본 파일과 export 한 파일을 연결시키는 역할
    mode:'development',//코드의 난독화
    plugins: [
        new HtmlWebpackPlugin({
            title: 'keyboard',
            template: './index.html',
            inject: 'body',
            favicon: './favicon.ico'
        }),
        new MiniCssExtractPlugin({filename: 'style.css'})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserWebPackPlugin()//좀더 수준 높은 압축
        ]
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
        watchFiles: 'index.html'
    }
}