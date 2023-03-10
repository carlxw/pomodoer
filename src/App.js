import './css/App.css';

import Todo from './sections/Todo';
import Pomodoro from './sections/Pomodoro';
import Music from './sections/Music';

function App() {
    return (
        <div className="app">
            <Todo />
            <Pomodoro />
            <Music />
        </div>
    );
}

export default App;