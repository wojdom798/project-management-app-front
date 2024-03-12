import React, { useState } from "react";
import Feature from "./Feature";
import { IProjectProps } from "../types/frontendSpecificTypes";
import { IFeature, ITask } from "../types/sharedTypes";

const projectData = {
    title: "My Project 1",
    description: "",

    features: [
        {
            name: "feature 1",
            priority: 1,
            isFinished: false
        },
        {
            name: "feature 2",
            priority: 2,
            isFinished: false
        },
        {
            name: "feature 3",
            priority: 1,
            isFinished: false
        },
    ]
}

// interface ProjectProps
// {
//     descriptionPlaceholder: string;
// };

function Project(props: IProjectProps)
{

    const getFeatures = () =>
    {
        let i = 0;
        return props.features.map((feature: IFeature) =>
        {
            return (
                <Feature
                    key={feature.id}
                    id={feature.id}
                    name={feature.name}
                    priority={feature.priority}
                    isFinished={feature.isFinished}
                    tasks={props.tasks.filter((t: ITask) => (t.feature_id == feature.id))}
                />
            );
        });
    };

    return (
        <div className="project">
            <h2 className="project__title">{props.name}</h2>
            <p className="project__description">{props.description}</p>

            <div className="project__feature-list">
                { getFeatures() }
            </div>
        </div>
    );
}

export default Project;