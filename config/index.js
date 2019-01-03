// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		  port: 8080,
        	sellUrl: 'http://192.168.100.209',
        	openidUrl: 'http://sell.springboot.cn/sell/wechat/authorize',
        	wechatPayUrl: 'http://192.168.100.209'
	},
	dev: {
		env: require('./dev.env'),
		port: 8081,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
    proxyTable: {
      '/sell': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://192.168.100.209', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        // pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
        //   '^/sell': ''
        // }
      }
    },
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false,
    sellUrl: 'http://192.168.100.209',
		openidUrl: 'http://127.0.0.1',
		wechatPayUrl: 'http://127.0.0.1'
	}
}
