import React, { useState, useEffect } from "react";
import { getAllTasks } from '../api/tasks.api';

export function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            try {
                const res = await getAllTasks();
                setTasks(res.data);
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        }

        loadTasks();
    }, []);
    
    return (
        <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}
