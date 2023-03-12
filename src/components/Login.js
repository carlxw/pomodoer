import React from "react";
import "../css/Music.css";

function Login() {
    return (
        <div className="login">
            <header className="App-header">
                <a id="spotify_login" href="/auth/login" >
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}

export default Login;

