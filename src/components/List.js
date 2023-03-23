import { useState } from "react";
import { arrRemove } from "../util/ArrayUtil";
import Task from "../util/Task";

const List = ({ title, items }) => {
    // Idea: Display list = incomplete tasks + complete tasks array merge
    let [tasks, updateTasks] = useState(items.map(x => new Task(x.name, x.isST, x.isDone)));
    let [tasksDone, updateTasksDone] = useState([]);

    // What the user types in the input box
    const [item, setItem] = useState("");

    /* ============================================================================== */
    
    const addTask = () => {
        // Do nothing if the user typed nothing
        if (item === "") {
            alert("You need to enter something")
            return;
        };

        // Check if there is a duplicate entry
        const dup = tasks.find((x) => (x === item));

        // Truthy - There is a duplicate entry
        if (dup) {
            alert("Duplicate entry.");
        } 
        // Add new task to array
        else {
            tasks.push(new Task(item, false, false));
            updateTasks(tasks);
        }

        // Reset input field text
        setItem("");
    }

    // Clears everything
    const clearAll = () => {
        updateTasks([]);
        updateTasksDone([]);
    }

    // Remove only the tasks that are completed
    const clearDone = () => {
        if (tasksDone === []) updateTasksDone([]);
        else alert("Nothing to remove.");
    }
    
    // Don"t refresh the page on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // When user presses checkmark
    const handleCheck = (e) => {
        // Incomplete to complete
        if (e.target.checked) {
            // Put task to completed array
            tasksDone.push(new Task(e.target.value, false, true));

            // Remove tasks from todo array
            tasks = arrRemove(tasks, e.target.value);

            updateTasksDone([...tasksDone]);
            updateTasks([...tasks]);
        }

        // Complete to incomplete
        else {
            // Put task to todo array
            tasks.push(new Task(e.target.value, false, true));

            // Remove the task from its position in the array
            tasksDone = arrRemove(tasksDone, e.target.value);

            updateTasks([...tasks]);
            updateTasksDone([...tasksDone]);
        }
    }

    return (
        <div className="list">
            <h1 className="list-header">{ title }</h1>
            
            <div>
                {tasks.map((x) => (
                    <div key={ x.taskName }>
                        <input 
                            className="task-checkbox" 
                            defaultChecked={ false }
                            type="checkbox" 
                            name={ x.taskName } 
                            value={ x.taskName } 
                            onChange={ handleCheck }
                            style={ x.isST ? {marginLeft: "50px"} : null }
                        />
                        <label className="task-label">{ x.taskName }</label>

                    </div>
                ))}
                {tasksDone.map((x) => (
                    <div key={ x.taskName }>
                        <input 
                            className="task-checkbox" 
                            defaultChecked={ true }
                            type="checkbox" 
                            name={ x.taskName } 
                            value={ x.taskName } 
                            onChange={ handleCheck }
                            style={ x.isST ? {marginLeft: "50px"} : null }
                        />
                        <label className="task-label">{ x.taskName }</label>
                    </div>
                ))}
            </div>

            <div>
                <form onSubmit={ handleSubmit } className="list-footer">
                    <input 
                        id="list-input"
                        type="text" 
                        name="item" 
                        placeholder="Enter a new task..."
                        value={ item } 
                        onChange={ (e) => setItem(e.target.value) } 
                        autoComplete="off"
                    />
                    
                    <div id="list-buttons">
                        <button 
                            id="list-add" 
                            onClick={addTask}
                            type="submit"
                        >Add</button>

                        <button id="list-clear-done" onClick={ clearDone }>Clear Done</button>
                        <button id="list-clear-all" onClick={ clearAll }>Clear All</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default List;