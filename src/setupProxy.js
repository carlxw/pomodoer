const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./config.json");

module.exports = function (app) {
    if (config.dev_mode) {
        app.use("/auth/**", 
            createProxyMiddleware({ 
                target: "http://localhost:8000"
            })
        );
    } else {
        app.use("/auth/**", 
            createProxyMiddleware({ 
                target: "https://pomodoro-node-backend.onrender.com"
            })
        );
    }
};
