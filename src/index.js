import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import config from "./config.json";

ReactDOM.render(
    <React.StrictMode>
        {
            config.gh_pages ?
            <HashRouter>
                <Routes>
                    <Route path="/pomodoro-website" element={ <App /> } />
                    <Route path="/auth/callback" />
                </Routes>
            </HashRouter>
            :
            <App /> 
        }
    </React.StrictMode>,
    document.getElementById("root")
);
