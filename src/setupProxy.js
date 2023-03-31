const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    // app.use("/auth/**", 
    //     createProxyMiddleware({ 
    //         target: "http://localhost:8000"
    //     })
    // );

    app.use("/auth/**", 
        createProxyMiddleware({ 
            target: "https://pomodoro-node-backend.onrender.com"
        })
    );
};
