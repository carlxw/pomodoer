import React from "react";

import "../css/Pre_Player.css";
import image from "../spotify-logo.png";

function Login() {
    return (
        <>
            {/* <img 
                src={ image }
                style={{
                    height: "10rem"
                }}
            /> */}

            <a id="spotify-login" href="/auth/login">
                Login with Spotify 
            </a>
        </>
    );
}

export default Login;

