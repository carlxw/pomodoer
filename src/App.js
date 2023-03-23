import "./css/Reset.css";
import "./css/App.css";
import "./css/Scrollbar.css";
import "./css/MediaQuery.css";
import "./css/Elements.css";
import "./css/Hover.css";
import "./css/Pomodoro.css";

import "./css/List.css";

import Todo from "./sections/Todo";
import Pomodoro from "./sections/Pomodoro";
import Music from "./sections/Music";

function App() {
    return (
        <div className="app">
            <div className="app-container">
                <div className="app-wrapper-left">
                    <Todo />
                </div>
                <div className="app-wrapper-right">
                    <Pomodoro />
                    <Music />
                </div>
                <div className="cls"/>
            </div>
        </div>
    );
}

export default App;