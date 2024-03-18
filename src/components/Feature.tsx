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

    const updateFinishedTask = (taskId: number, isFinished: boolean) =>
    {
        for (let task of tasks)
        {
            if (task.id === taskId)
            {
                task.isFinished = isFinished;
            }
        }
        setProgressUI(calculateProgress());
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