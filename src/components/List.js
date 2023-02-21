import { useState } from "react";

const List = ({ title }) => {
    const [tasks, updateTasks] = useState(["Task 1", "Task 2", "Task 3"]);
    const [item, setItem] = useState("Enter a task");

    const addTask = () => {
        // Add new task to array
        tasks.push(item)
        updateTasks(tasks);

        // Reset input field text
        setItem("Enter a task");
    }

    const clearArray = () => {
        // Clears the array
        updateTasks([]);
    }

    const handleSubmit = (e) => {
        // Don't refresh the page
        e.preventDefault();
    }

    return (
        <div className="task_list">
                <h1 className="list_header">{ title }</h1>
                
                <div>
                    {tasks.map((x) => (
                        <div key={ x }>
                            <input className="task_checkbox" type="checkbox" name={ x } value={ x } />
                            <label className="task_label">{ x }</label>
                            <br />
                        </div>
                    ))}
                </div>

                <br />

                <form onSubmit={ handleSubmit }>
                    <input className="task_checkbox" type="checkbox" />
                    <input 
                        id="task_input"
                        type="text" 
                        name="item" 
                        value={ item } 
                        onChange={ (e) => setItem(e.target.value) } 
                    />
                    <button 
                        id="task_add" 
                        onClick={addTask}
                        type="submit"
                    >Add</button>
                    <button onClick={clearArray}>Clear</button>
                </form>
        </div>
    );
}

export default List;