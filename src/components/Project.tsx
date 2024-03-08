import React, { useState } from "react";
import Feature, { FeatureProps } from "./Feature";

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

interface ProjectProps
{
    descriptionPlaceholder: string;
};

function Project(props: ProjectProps)
{

    const getFeatures = () =>
    {
        let i = 0;
        return projectData.features.map((feature: FeatureProps) =>
        {
            return (
                <Feature
                    key={i++}
                    name={feature.name}
                    priority={feature.priority}
                    isFinished={feature.isFinished}
                />
            );
        });
    };

    return (
        <div className="project">
            <h2 className="project__title">{projectData.title}</h2>
            <p className="project__description">{props.descriptionPlaceholder}</p>

            <div className="project__feature-list">
                { getFeatures() }
            </div>
        </div>
    );
}

export default Project;