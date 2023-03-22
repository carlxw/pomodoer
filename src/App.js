import "./css/App.css";
import "./css/Scrollbar.css";

import Todo from "./sections/Todo";
import Pomodoro from "./sections/Pomodoro";
import Music from "./sections/Music";

function App() {
    return (
        <div className="app">
            <div id="container">
                <Todo />
                <Pomodoro />
                <Music />
            </div>
        </div>
    );
}

export default App;