// //setupProxy.js

// const proxy = require('http-proxy-middleware')

// module.exports = function(app) {
//     const apiProxy = proxy('/', {target: 'http://localhost:5000'});
//     const wsProxy = proxy('/', {target: "http://localhost:5000", ws: true});
//     app.use(apiProxy);
//     app.use(wsProxy);
//     //app.use('/', proxy({ target: 'http://localhost:5000', changeOrigin: true }));
// };