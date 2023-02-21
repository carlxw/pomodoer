import './css/App.css';

import Todo from './sections/Todo';
import Timer from './sections/Timer';
import Music from './sections/Music';

function App() {
    return (
        <div className="app">
            <Todo />
            <Timer />
            <Music />
        </div>
    );
}

export default App;
