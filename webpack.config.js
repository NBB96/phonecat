const CopyWepackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssWebpackPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {loader: 'babel-loader'},
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssWebpackPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssWebpackPlugin.loader, 'css-loader', 'less-loader']
            },

            // 图片加载器 url-loader: base64编码的字符串图片，file-loader：图片文件
            {
                test: /\.(gif|jpe?g|png|eot|svg|ttf|woff2?)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 8, // 限制在8kb以下使用base64编码
                        fallback: 'file-loader' // 超过8kb则使用file-loader加载器
                    }
                }
            },
            // html加载器：将html文件转成字符串
            {
                test: /\.html$/, use: {loader: 'html-loader'}
            }
        ]
    },
    plugins: [
        // 不需要经过webpack打包，而是复制到 output.path 指定的输出目录下
        new CopyWepackPlugin([
            // to: {output.path}/static
            { from: './static', to: 'static' }
        ]),

        // 在 output.path 指定的输出目录创建一个html文件，会自动引入打包后输出的js文件
        // new HtmlWebpackPlugin()
        new HtmlWebpackPlugin({
            title: 'AngularJS', // 标题
            filename: 'index.html', // 文件名
            // favicon: 'static/favicon.ico', // 图标
            template: './src/index.html',  // 模板 
            minify: { // 压缩
                collapseWhitespace: true // 去掉空白，换行等
            }
        }),
        new MiniCssWebpackPlugin({
            filename: 'style.css'
            // filename: '[name].css'
        }),
        // 清空 dist 目录
        new CleanWebpackPlugin()
    ],

    // devServer
    devServer: {
        port: 80, // 启动的服务器的端口号
        open: true // 自动打开浏览器
    }
}