import { useState } from "react";

const List = ({ title }) => {
    const [tasks, updateTasks] = useState(["Task 1", "Task 2", "Task 3"]);
    const [item, setItem] = useState("");

    const addTask = () => {
        // Check if there is a duplicate entry
        const dup = tasks.find((x) => (
            x === item
        ));

        // Truthy - There is a duplicate entry
        if (dup) {
            alert("Duplicate entry.");
        } else {
            // Add new task to array
            tasks.push(item)
            updateTasks(tasks);

            // Reset input field text
        }
        setItem("");
    }

    // Clears the task array
    const clearArray = () => {
        updateTasks([]);
    }

    // Don't refresh the page on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="task_list">
            <h1 className="list_header">{ title }</h1>
            
            <div>
                {tasks.map((x) => (
                    <div key={ x }>
                        <input 
                            className="task_checkbox" 
                            type="checkbox" name={ x } 
                            value={ x } 
                        />
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
                    placeholder="Type something here..."
                    value={ item } 
                    onChange={ (e) => setItem(e.target.value) } 
                    autoComplete="off"
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