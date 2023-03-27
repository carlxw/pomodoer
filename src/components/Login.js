import React from "react";

import image from "../resources/spotify-logo.png";

function Login() {
    return (
        <div className="login">
            <img src={ image }/>

            <div className="spotify-info">
                <h1 id="player-name">Spotify Player</h1>

                <p>
                    Don't tab out! Login below and control <br />
                    your Spotify music directly here!
                </p>

                <a id="spotify-login" href="/auth/login">
                    Login with Spotify 
                </a>
            </div>
        </div>
    );
}

export default Login;