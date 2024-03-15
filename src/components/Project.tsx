import React, { useState } from "react";
import Feature from "./Feature";
import { IProjectProps } from "../types/frontendSpecificTypes";
import { IFeature, ITask } from "../types/sharedTypes";

function Project(props: IProjectProps)
{

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