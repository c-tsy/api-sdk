const path = require('path')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    mode: "production",
    entry: { //入口文件
        index: './dist/index.js',
    },
    output: { //出口文件
        publicPath: './', //模板、样式、脚本、图片等资源的路径中统一会加上额外的路径
        path: path.resolve(__dirname, 'cdn'),
        filename: './api-sdk.min.js'
    },
    node: {
        Buffer: false
    },
    module: {
        rules: []
    },
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        lodash: '_',
        moment: 'moment',
        xlsx: 'XLSX',
        vant: 'vant',
        'protobufjs': 'protobuf',
        'protobufjs/light': 'protobuf',
        buffer: 'Buffer',
        store: 'Store',
        'vue-baidu-map': 'VueBaiduMap.default',
        'element-ui': 'ELEMENT',
        'vue-i18n': 'VueI18n',
        'fuse.js': 'Fuse',
        'jszip': 'JSZip',
        nprogress: 'NProgress',
        screenfull: 'screenfull',
        '@ctsy/hook': 'Hook'
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ]
};