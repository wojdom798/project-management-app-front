import React, { useState } from "react";
import { ITaskProps } from "../types/frontendSpecificTypes";

function Task({ id, name, isFinished }: ITaskProps)
{
    const [isFinishedUI, toggleFinished] = useState<boolean>(isFinished);

    return (
        <li
            className={
                isFinishedUI ?
                "task task--finished" :
                "task"
            }
        >
            <span>{ name }</span>
            <button
                onClick={ () => toggleFinished(!isFinishedUI) }
            >
                toggle finished
            </button>
        </li>
    );
}

export default Task;