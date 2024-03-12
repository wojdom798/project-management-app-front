import { IFeature, ITask } from "./sharedTypes";

export interface IProjectProps
{
    id: number;
    name: string;
    description: string;
    features: IFeature[];
    tasks: ITask[];
};

export interface IFeatureProps
{
    id: number;
    name: string;
    priority: number;
    isFinished: boolean;
    tasks: ITask[];
};

export interface ITaskProps
{
    id: number;
    name: string;
};