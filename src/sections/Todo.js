import "../css/Todo.css";
import List from "../components/List";

const Todo = () => {
    return (
        <div className="todo">
            <List title="Session Goals" />
            <List title="Break Goals" />
        </div>
    );
}

export default Todo;