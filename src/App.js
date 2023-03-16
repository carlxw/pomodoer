import "./css/App.css";

import Todo from "./sections/Todo";
import Pomodoro from "./sections/Pomodoro";
import Music from "./sections/Music";

function App() {
    return (
        <div className="app">
            <Todo />
            <div id="container_R"><Pomodoro /></div>
            <div id="container_R"><Music /></div>
        </div>
    );
}

export default App;