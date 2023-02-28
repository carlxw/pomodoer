import { useState } from "react";
import { arrRemove } from "../util/ArrayUtil";
import Task from "../util/Task";

const List = ({ title }) => {
    let [tasks, updateTasks] = useState([new Task("Task 1", false, false), new Task("Task 2", false, false), new Task("Task 3", false, false), new Task("Task 4", false, false), new Task("Task 5", false, false)]);
    const [item, setItem] = useState("");

    const addTask = () => {
        // Check if there is a duplicate entry
        const dup = tasks.find((x) => (x === item));

        // Truthy - There is a duplicate entry
        if (dup) {
            alert("Duplicate entry.");
        } else {
            // Add new task to array
            tasks.push(new Task(item, false, false));
            updateTasks(tasks);
        }
        // Reset input field text
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

    // When user presses checkmark
    const handleCheck = (e) => {
        // Incomplete to complete
        if (e.target.checked) {
            // Complete tasks will be found at the bottom of the array
            tasks.push(new Task(e.target.value, false, true));

            tasks = arrRemove(tasks, e.target.value);
            updateTasks([...tasks]);
            console.log(tasks);
        }

        // Complete to incomplete
        else {
            // Obtain index of where to insert (before the completed list)
            let index;
            for (let i = 0; i < tasks.length - 1; i++) {
                if (tasks[i].isDone === true) {
                    index = i;
                    break;
                }
            }

            // Remove the task from its position in the array
            tasks = arrRemove(tasks, e.target.value);

            tasks.splice(index, 0, new Task(e.target.value, false, false));
            updateTasks([...tasks]);
        }
    }

    return (
        <div className="task_list">
            <h1 className="list_header">{ title }</h1>
            
            <div>
                {tasks.map((x) => (
                    <div key={ x.taskName }>
                        <input 
                            className="task_checkbox" 
                            defaultChecked={ x.taskName.includes("[DONE]") ? true : false }
                            type="checkbox" 
                            name={ x.taskName } 
                            value={ x.taskName } 
                            onChange={ handleCheck }
                            style={ x.isST ? {marginLeft: "50px"} : null }
                        />
                        <label className="task_label">{ `${x.isDone ? "DONE: " : ""} ${x.taskName}` }</label>
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