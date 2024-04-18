const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
        app.use(
            createProxyMiddleware('/', {
            target: 'http://223.130.134.181:8080',
            changeOrigin: true,
        }),
    );
 };