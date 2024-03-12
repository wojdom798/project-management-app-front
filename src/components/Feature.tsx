import React, { useState } from "react";
import Task from "./Task";
import { ITask } from "../types/sharedTypes";
import { IFeatureProps, ITaskProps } from "../types/frontendSpecificTypes";

// export interface FeatureProps
// {
//     id: number;
//     name: string;
//     priority: number;
//     isFinished: boolean;
// };

const listOfTasksDbg = [
    {
        id: 1,
        name: "task 1" 
    },
    {
        id: 2,
        name: "task 2" 
    }
]

interface ITaskDbg
{
    id: number;
    name: string;
}

function Feature(props: IFeatureProps)
{
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
                <p>is finished: {props.isFinished ? "true" : "false"}</p>
                
            </div>

            <ul className="list-of-tasks">
                { props.tasks.map((task: ITaskProps) => (
                    <Task key={task.id} id={task.id} name={task.name} />)) }
            </ul>
        </div>
    );
}

export default Feature;