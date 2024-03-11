import React, { useState } from "react";
import { ITask } from "../types/sharedTypes";

function Task({ text }: ITask)
{
    return (
        <li className="task">
            { text }
        </li>
    );
}

export default Task;