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
			setToken(json.access_token);

            
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
                    <Music token={ token } />
                </div>
            </div>
        </div>
    );
}

export default App;