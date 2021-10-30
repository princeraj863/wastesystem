const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = async function (app) {
  await console.log("fuk");
  app.use(
    "/signin",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
