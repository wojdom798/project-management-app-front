import React, { useState } from "react";
import { ITaskProps } from "../types/frontendSpecificTypes";

function Task({ id, name }: ITaskProps)
{
    return (
        <li className="task">
            { name }
        </li>
    );
}

export default Task;