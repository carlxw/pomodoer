import List from "../components/List";

import config from "../config.json";

const Todo = () => {
    return (
        <div className="todo">
            <List title={ config.todo_header } items={ config.todo_default }/>
            <List title={ config.break_header } items={ config.breaks_default }/>
        </div>
    );
}

export default Todo;