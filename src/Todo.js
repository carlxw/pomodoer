const Todo = () => {
    return (
        <div className="todo">
            <div className="session_goals">
                <h1 className="list_header">Session Goals</h1>
                <ul>
                    <li>Type here to add...</li>
                </ul>
                <button>Clear</button>
            </div>

            <div className="break_goals">
                <h1 className="list_header">Break Goals</h1>
                <ul>
                    <li>Type here to add...</li>
                </ul>
                <button>Clear</button>
            </div>
        </div>
    );
}

export default Todo;