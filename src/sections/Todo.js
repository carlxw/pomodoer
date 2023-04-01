import List from "../components/List";

import config from "../config.json";

const Todo = () => {
    return (
        <div className="todo-background">
            <div className="todo">
                <List id="list-1" title={ config.todo_header } items={ config.todo_default } />
                <List id="list-2" title={ config.break_header } items={ config.breaks_default } />
            </div>
        </div>
    );
}

export default Todo;