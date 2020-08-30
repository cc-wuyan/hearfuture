const webpack = require('webpack')
const express = require('express')
const app = express()
const CompressionPlugin = require("compression-webpack-plugin");
var apiRoutes = express.Router();
app.use('/api', apiRoutes)

let objectProject = {
    index: {
        entry: './src/main.js', // page 的入口
        template: './public/index.html', // 模板来源
        filename: 'index.html', // 在 dist/index.html 的输出
        // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Index Page',
        // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
}
let page = {}
let projectname = process.argv[3] // 获取build后面的参数确定执行哪个文件
if (process.env.NODE_ENV == 'development') {
    page = objectProject //判断开发环境不用
} else {
    //假如命令npm run build-index,
    //就会得到projectname=index
    page[projectname] = objectProject[projectname]
        // {
        //   index: {
        //     entry: 'src/views/index/main.js',
        //     template: 'public/index.html', 
        //     filename: 'index.html',
        //     chunks: ['chunk-vendors', 'chunk-common', 'index']
        //   }
        // }
}
module.exports = {
    publicPath: './', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
    outputDir: './dist', //标识是打包哪个文件
    assetsDir: 'public',
    pages: page,
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            // 'element-ui': 'ElementUI'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            }),
            // new CompressionPlugin({
            //     /* [file]被替换为原始资产文件名。
            //        [path]替换为原始资产的路径。
            //        [dir]替换为原始资产的目录。
            //        [name]被替换为原始资产的文件名。
            //        [ext]替换为原始资产的扩展名。
            //        [query]被查询替换。*/
            //     filename: '[path].gz[query]',
            //     //压缩算法
            //     algorithm: 'gzip',
            //     //匹配文件
            //     test: /\.js$|\.css$|\.html$/,
            //     //压缩超过此大小的文件,以字节为单位
            //     threshold: 10240,
            //     minRatio: 0.8,
            //     //删除原始文件只保留压缩后的文件
            //     deleteOriginalAssets: true
            // })
        ],
    },
    devServer: {
        open: true, // 项目构建成功之后，自动弹出页面
        // proxy: "http://220.249.46.62:8080/",
        // proxy: "https://silencerapi_test.speech.sogou.com/",//测试版1
        // proxy: "https://nlutest.speech.sogou.com/",//测试版2
        // proxy: "https://silencerapitest.speech.sogou.com",//正式版
        port: 8082
    }
}