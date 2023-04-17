import "./css/Reset.css";
import "./css/App.css";
import "./css/Scrollbar.css";
import "./css/MediaQuery.css";
import "./css/Elements.css";
import "./css/Hover.css";
import "./css/Pomodoro.css";
import "./css/Spotify-Login.css";
import "./css/Connect-Player.css";
import "./css/Spotify-Player.css";
import "./css/List.css";
import "./css/Animation.css";

import Todo from "./sections/Todo";
import Pomodoro from "./sections/Pomodoro";
import Music from "./sections/Music";

import config from "./config.json";

import React, { useState, useEffect } from "react";

function App() {
    // Spotify Login
    const [token, setToken] = useState("");

	useEffect(() => {
		async function getToken() {
			let response = await fetch(`${config.dev ? "" : config.server_url}/auth/token`);
			let json = await response.json();
            
            if (json.access_token === "") return;
            setToken(json.access_token);

            // Interval will run if token is not empty string
            setTimeout(async () => {
                console.log("Refreshing token on React");

                // Get the refresh token
                let response_refresh_token = await fetch(`${config.dev ? "" : config.server_url}/auth/refresh_token`);
                let json_refresh_token = await response_refresh_token.json();

                // Send refresh token
                let response = await fetch(`${config.dev ? "http://localhost:8000" : config.server_url}/refresh_token?refresh_token=${json_refresh_token.refresh_token}`);
                let json = await response.json();
                setToken(json.access_token);

                console.log("Token refreshed");
            }, 10000);
		}
		getToken();
  	}, []);

    return (
        <div className="app">
            <div className="app-container">
                <div className="app-wrapper-left">
                    <Todo />
                </div>
                <div className="app-wrapper-right" style={ !token ? {} : { backgroundImage: `url(${config.images[Math.floor(Math.random()*config.images.length)]})` }}>
                    <Pomodoro />
                    <Music token={ token } setToken={ setToken } />
                </div>
            </div>
        </div>
    );
}

export default App;