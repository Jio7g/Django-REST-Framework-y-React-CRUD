import React, { useState, useEffect } from "react";
import { getAllTasks } from '../api/tasks.api';
import {TaskCard} from "./TaskCard"

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
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
