import React from "react";

import "../css/Youre_Connected.css";
import image from "../spotify-logo.png";

function Login() {
    return (
        <>
            <div className="login-container">
                <div>
                    <img 
                        src={ image }
                        style={{
                            height: "12.5rem"
                        }}
                    />
                </div>

                <div>
                    <div>
                        <h1 style={{ color: "white" }}>Spotify Player</h1>

                        <p style={{ color: "white", fontSize: "1rem" }}>
                            Don't tab out! Login below and control your <br />
                            Spotify music directly here!
                        </p>

                        <a id="spotify-login" href="/auth/login">
                            Login with Spotify 
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

