import React from "react";
import image from "../resources/spotify-logo.png";
import config from "../config.json";

function Login() {
    return (
        <div className="login">
            <img src={ image } />

            <div className="spotify-info">
                <h1 id="player-name">Spotify Player</h1>

                <p>
                    Don't tab out! Login below and control <br />
                    your Spotify music directly here!
                </p>

                <a id="spotify-login" href={
                    config.dev ? "/auth/login" : "https://pomodoro-node-backend.onrender.com/auth/login"
                }>
                    Login with Spotify 
                </a>
            </div>
        </div>
    );
}

export default Login;