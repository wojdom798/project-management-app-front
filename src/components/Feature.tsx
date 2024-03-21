import React, { useState, useEffect } from "react";
import Task from "./Task";
import { ITask } from "../types/sharedTypes";
import { IFeatureProps, ITaskProps } from "../types/frontendSpecificTypes";

function Feature(props: IFeatureProps)
{
    const [progressUI, setProgressUI] = useState<number>(props.progress);
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() =>
    {
        setTasks(props.tasks);
        setProgressUI(calculateProgress());
    }, []);

    const calculateProgress = () =>
    {
        const maxProgress = tasks.length;
        let currentProgress = 0;

        for (let task of tasks)
        {
            if (task.isFinished)
            {
                currentProgress++;
            }
        }

        return Math.round((currentProgress / maxProgress) * 100);
    };

    const updateFinishedTask = async (taskId: number, isFinished: boolean) =>
    {
        let newProgress = 0;
        let tasksFinished = 0;
        for (let task of tasks)
        {
            if (task.isFinished)
            {
                tasksFinished++;
            }
        }
        if (isFinished)
        {
            tasksFinished++;
        }
        else
        {
            tasksFinished--;
        }
        newProgress = Math.round((tasksFinished / tasks.length) * 100);

        const payload = JSON.stringify({
            taskId: taskId,
            isFinished: isFinished,
            featureId: props.id,
            newProgress: newProgress
        });

        const requestInit = {
            method: "POST",
            body: payload,
            headers: { "Content-Type": "application/json" }
        };
        
        const response = await fetch("/api/update-feature-progress", requestInit);
        
        if (response.ok)
        {
            const responseData = await response.json();
            // console.log(responseData);
            for (let task of tasks)
            {
                if (task.id === taskId)
                {
                    task.isFinished = isFinished;
                }
            }
            setProgressUI(calculateProgress());
        }
    };

    return (
        <div className="feature-wrapper">
            <div
                className={
                    props.priority == 1 ?
                    "feature feature--core" :
                    "feature"
                }
            >
                <h3>{props.name}</h3>
                <p>priority: {props.priority}</p>
                <p>progress: {`${progressUI}%`}</p>
                
            </div>

            <ul className="list-of-tasks">
                { props.tasks.map((task: ITask) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        isFinished={task.isFinished}
                        setIsFinished={updateFinishedTask}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Feature;