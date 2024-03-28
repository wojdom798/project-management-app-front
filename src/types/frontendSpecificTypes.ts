import { IFeature, ITask } from "./sharedTypes";

export interface IProjectProps
{
    id: number;
    name: string;
    description: string;
    features: IFeature[];
    tasks: ITask[];
    addNewFeatureToList: (feature: IFeature) => void;
};

export interface IFeatureProps
{
    id: number;
    name: string;
    priority: number;
    progress: number;
    tasks: ITask[];
};

export interface ITaskProps
{
    id: number;
    name: string;
    isFinished: boolean;
    setIsFinished: (taskId: number, isFinished: boolean) => any;
};