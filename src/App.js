import "./css/App.css";

import Todo from "./sections/Todo";
import Pomodoro from "./sections/Pomodoro";
import Music from "./sections/Music";

function App() {
    return (
        <div className="app">
            <div id="container">
                {/* <div id="child-container"><Todo /></div>
                <div id="child-container"><Pomodoro /></div>
                <div id="child-container"><Music /></div> */}
                <Todo />
                <Pomodoro />
                <Music />
            </div>
        </div>
    );
}

export default App;