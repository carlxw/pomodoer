const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./config.json");

module.exports = function (app) {
    // app.use("/auth/**", 
    //     createProxyMiddleware({ 
    //         target: "http://localhost:8000"
    //     })
    // );

    app.use("/auth/**", 
        createProxyMiddleware({ 
            target: "https://pomodoro-node-backend.onrender.com",
            secure: false,
            changeOrigin: true,
            toProxy: true
        })
    );
};
