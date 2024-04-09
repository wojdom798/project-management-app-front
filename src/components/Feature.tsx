import React, { useState, useEffect, SyntheticEvent } from "react";
import Task from "./Task";
import { ITask } from "../types/sharedTypes";
import { IFeatureProps, ITaskProps } from "../types/frontendSpecificTypes";

function Feature(props: IFeatureProps)
{
    const [progressUI, setProgressUI] = useState<number>(props.progress);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isCreateNewTaskFormActive, setIsCreateNewTaskFormActive] =
        useState<boolean>(false);

    // new task form inputs
    const [nameField, setNameField] = useState<string>("");


    useEffect(() =>
    {
        setTasks(props.tasks);
        setProgressUI(calculateProgress(props.tasks));
    }, []);

    const calculateProgress = (tasks: ITask[]) =>
    {
        const maxProgress = tasks.length;
        let currentProgress = 0;

        if (tasks.length == 0)
        {
            return 0;
        }

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
            setProgressUI(calculateProgress(tasks));
        }
    };

    const handleCreateNewFeatureFormSubmit = async (event: SyntheticEvent) =>
    {
        event.preventDefault();

        const submitData = {
            name: nameField,
            featureId: props.id
        }

        console.log(submitData);

        // setIsCreateNewTaskFormActive(false);
    }

    const handleCreateNewTaskFormCancel = (event: SyntheticEvent) =>
    {
        event.preventDefault();
        setIsCreateNewTaskFormActive(false);
    };

    const handleCreateNewTaskButtonClick = (event: SyntheticEvent) =>
    {
        event.preventDefault();
        setIsCreateNewTaskFormActive(true);
    };

    const handleNewTaskNameInputChange = (event: SyntheticEvent) =>
    {
        const inputValue = (event.target as HTMLInputElement).value;
        setNameField(inputValue);
    };

    return (
        <div className="feature-wrapper">
            <div
                className={
                    props.priority === 1 ?
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

            <div className="feature__new-task-button">
            { isCreateNewTaskFormActive ?
            (
                <form>
                    <h3>Create New Task</h3>

                    <div className="form-input-group">
                        <label htmlFor={`task-${props.id}-name-input`}>name</label>
                        <input
                            id={`task-${props.id}-name-input`}
                            name={`task-${props.id}-name-input`}
                            type={"text"}
                            value={nameField}
                            placeholder={"name"}
                            onChange={handleNewTaskNameInputChange}
                        />
                    </div>

                    <div className="button-group">
                        <button
                            onClick={handleCreateNewFeatureFormSubmit}
                        >submit</button>
                        <button
                            onClick={handleCreateNewTaskFormCancel}
                        >cancel</button>
                    </div>
                </form>
            ):(
                <button
                    onClick={handleCreateNewTaskButtonClick}
                >new task</button>
            )}
            </div>
        </div>
    );
}

export default Feature;