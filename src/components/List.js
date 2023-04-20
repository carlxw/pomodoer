import { useState } from "react";
import { arrRemove } from "../util/ArrayUtil";
import Task from "../util/Task";

const List = ({ title, items }) => {
    // There is data from a previous session
    if (sessionStorage.getItem(title)) {
        const data = JSON.parse(sessionStorage.getItem(title));
        let tasks_temp = [];
        let tasksDone_temp = [];

        data.forEach(x => {
            if (x.isDone) tasksDone_temp.push(new Task(x.taskName, x.isST, x.isDone));
            else tasks_temp.push(new Task(x.taskName, x.isST, x.isDone));
        });

        var [tasks, updateTasks] = useState(tasks_temp);
        var [tasksDone, updateTasksDone] = useState(tasksDone_temp);
    } else {
        // Idea: Display list = incomplete tasks + complete tasks array merge
        var [tasks, updateTasks] = useState(items.map(x => new Task(x.name, x.isST, x.isDone)));
        var [tasksDone, updateTasksDone] = useState([]);
    }

    // What the user types in the input box
    const [item, setItem] = useState("");

    /* ============================================================================== */
    
    const save = () => {
        sessionStorage.setItem(title, JSON.stringify(tasks.concat(tasksDone)));
    }

    const addTask = () => {
        // Do nothing if the user typed nothing
        if (item === "") {
            alert("You need to enter something")
            return;
        };

        // Add new task to array
        tasks.push(new Task(item, false, false));
            updateTasks(tasks);

        // Reset input field text
        setItem("");
        save();
    }

    // Clears everything
    const clearAll = () => {
        updateTasks([]);
        updateTasksDone([]);
        tasks = [];
        tasksDone = [];
        save();
    }

    // Remove only the tasks that are completed
    const clearDone = () => {
        console.log(tasksDone)
        if (tasksDone !== []) {
            tasksDone = [];
            updateTasksDone([])
            save();
        }
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
            save();
        }

        // Complete to incomplete
        else {
            // Put task to todo array
            tasks.push(new Task(e.target.value, false, true));

            // Remove the task from its position in the array
            tasksDone = arrRemove(tasksDone, e.target.value);

            updateTasks([...tasks]);
            updateTasksDone([...tasksDone]);
            save();
        }
    }

    // Edit task name
    const editTask = (e) => {
        // Find the item in the to-do array
        const idx = tasks.findIndex(x => x.taskName === e.target.innerText);

        // Prompt user for edit
        let newtask = prompt("Edit task name:", e.target.innerText);

        // Process
        if (newtask === null || newtask === "") return;
        else {
            tasks[idx].taskName = newtask;
            updateTasks([...tasks]);
            save();
        }
    }

    return (
        <div className="list">
            <h1 className="list-header">{ title }</h1>
            
            <div>
                {tasks.map((x, idx) => (
                    <div key={ idx }>
                        <input 
                            className="task-checkbox" 
                            defaultChecked={ false }
                            type="checkbox" 
                            name={ x.taskName } 
                            value={ x.taskName } 
                            onChange={ handleCheck }
                            style={ x.isST ? {marginLeft: "50px"} : null }
                        />
                        <label className="task-label" onClick={ editTask }>{ x.taskName }</label>
                    </div>
                ))}

                {tasksDone.map((x, idx) => (
                    <div key={ idx }>
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
                            onClick={ addTask }
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