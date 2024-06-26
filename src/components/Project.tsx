import React, { useState, SyntheticEvent } from "react";
import Feature from "./Feature";
import { IProjectProps } from "../types/frontendSpecificTypes";
import { IFeature, ITask } from "../types/sharedTypes";

function Project(props: IProjectProps)
{
    const [isCreateNewFeatureFormActive, setIsCreateNewFeatureFormActive] =
        useState<boolean>(false);

    // new feature form inputs
    const [nameField, setNameField] = useState<string>("");
    const [priorityField, setPriorityField] = useState<number>(1);

    const getFeatures = () =>
    {
        return props.features.map((feature: IFeature) =>
        {
            return (
                <Feature
                    key={feature.id}
                    id={feature.id}
                    name={feature.name}
                    priority={feature.priority}
                    progress={feature.progress}
                    tasks={props.tasks.filter((t: ITask) => (t.feature_id === feature.id))}
                    addNewTaskToList={props.addNewTaskToList}
                />
            );
        });
    };

    const handleCreateNewFeatureButtonClick = () =>
    {
        setIsCreateNewFeatureFormActive(true);
    };

    const handleCreateNewFeatureFormSubmit = async (event: SyntheticEvent) =>
    {
        event.preventDefault();

        const submitData = {
            name: nameField,
            priority: priorityField,
            projectId: props.id
        }

        const payload = JSON.stringify(submitData);

        const requestInit = {
            method: "POST",
            body: payload,
            headers: { "Content-Type": "application/json" }
        };
        
        const response = await fetch("/api/create-new-feature", requestInit);

        if (response.ok)
        {
            const responseData = await response.json();
            // console.log(responseData.payload.newFeatureId);

            props.addNewFeatureToList({
                ...submitData,
                id: responseData.payload.newFeatureId,
                progress: 0,
                project_id: props.id
            }, props.id);
        }
    };

    const handleCreateNewFeatureFormCancel = (event: SyntheticEvent) =>
    {
        event.preventDefault();
        setIsCreateNewFeatureFormActive(false);
    };

    const handleNewFeatureNameInputChange = (event: SyntheticEvent) =>
    {
        const inputValue = (event.target as HTMLInputElement).value;
        setNameField(inputValue);
    };

    const handleNewFeaturePriorityInputChange = (event: SyntheticEvent) =>
    {
        const inputValue = (event.target as HTMLInputElement).value;
        let sanitizedValue = parseInt(inputValue);
        if (!isNaN(sanitizedValue))
        {
            setPriorityField(sanitizedValue);
        }
    };

    const handleGoBackButtonClick = (ev: SyntheticEvent) =>
    {
        ev.preventDefault();
        props.goBack();
    };

    return (
        <div className="project">
            <h2 className="project__title">
                {props.name}
                <button onClick={handleGoBackButtonClick}>go back</button>
            </h2>
            <p className="project__description">{props.description}</p>

            <div className="project__feature-list">
                { getFeatures() }
            </div>

            <div className="project__new-feature-button">

                { isCreateNewFeatureFormActive ?
                (
                    <form>
                        <h3>Create New Feature</h3>

                        <div className="form-input-group">
                            <label htmlFor="nameInput">name</label>
                            <input
                                id={"nameInput"}
                                name={"nameInput"}
                                type={"text"}
                                value={nameField}
                                placeholder={"name"}
                                onChange={handleNewFeatureNameInputChange}
                            />
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="priorityInput">priority</label>
                            <input
                                id={"priorityInput"}
                                name={"priorityInput"}
                                type={"text"}
                                value={priorityField}
                                placeholder={"priority (positive number)"}
                                onChange={handleNewFeaturePriorityInputChange}
                            />
                        </div>

                        <button
                            onClick={handleCreateNewFeatureFormSubmit}
                        >submit</button>
                        <button
                            onClick={handleCreateNewFeatureFormCancel}
                        >cancel</button>
                    </form>
                ):(
                    <button
                        onClick={handleCreateNewFeatureButtonClick}
                    >new feature</button>
                )}

                
            </div>
        </div>
    );
}

export default Project;