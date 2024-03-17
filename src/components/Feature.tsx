import React, { useState, useEffect } from "react";
import Task from "./Task";
import { ITask } from "../types/sharedTypes";
import { IFeatureProps, ITaskProps } from "../types/frontendSpecificTypes";

function Feature(props: IFeatureProps)
{
    const [progressUI, setProgressUI] = useState<number>(props.progress);

    useEffect(() =>
    {
        setProgressUI(calculateProgress());
    }, []);

    const calculateProgress = () =>
    {
        const maxProgress = props.tasks.length;
        let currentProgress = 0;

        for (let task of props.tasks)
        {
            if (task.isFinished)
            {
                currentProgress++;
            }
        }

        return Math.round((currentProgress / maxProgress) * 100);
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
                { props.tasks.map((task: ITaskProps) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        isFinished={task.isFinished}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Feature;