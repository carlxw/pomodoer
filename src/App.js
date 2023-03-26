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

import Todo from "./sections/Todo";
import Pomodoro from "./sections/Pomodoro";
import Music from "./sections/Music";

import config from "./config.json";

function App() {
    // Choose a random background iamge
    const image = Math.floor(Math.random()*config.images.length);
    console.log(image);
    return (
        <div className="app">
            <div className="app-container">
                <div className="app-wrapper-left">
                    <Todo />
                </div>
                <div className="app-wrapper-right" style={{ backgroundImage: `url(${config.images[image]})` }}>
                    <Pomodoro />
                    <Music />
                </div>
            </div>
        </div>
    );
}

export default App;