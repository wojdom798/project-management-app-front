import React, { useState } from "react";

export interface FeatureProps
{
    name: string;
    priority: number;
    isFinished: boolean;
};

function Feature(props: FeatureProps)
{
    return (
        <div
            className={
                props.priority == 1 ?
                "feature feature--core" :
                "feature"
            }
        >
            <h3>{props.name}</h3>
            <p>priority: {props.priority}</p>
            <p>is finished: {props.isFinished}</p>
        </div>
    );
}

export default Feature;