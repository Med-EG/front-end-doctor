// In your React application (e.g., src/setupProxy.js if using create-react-app)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://api-medeg.online',
    changeOrigin: true,
    secure: false, // if you are using a self-signed certificate
  }));
};
