import React, { useState } from "react";
import { ITaskProps } from "../types/frontendSpecificTypes";

function Task({ id, name, isFinished, setIsFinished }: ITaskProps)
{
    const [isFinishedUI, toggleFinished] = useState<boolean>(isFinished);

    const handleToggleFinishedClick = () =>
    {
        const currentIsFinished = !isFinishedUI;
        toggleFinished(currentIsFinished);
        setIsFinished(id, currentIsFinished); // prop
    };

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
                // onClick={ () => toggleFinished(!isFinishedUI) }
                onClick={handleToggleFinishedClick}
            >
                toggle finished
            </button>
        </li>
    );
}

export default Task;