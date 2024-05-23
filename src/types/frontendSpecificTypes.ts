import { IFeature, ITask } from "./sharedTypes";

export interface IProjectProps
{
    id: number;
    name: string;
    description: string;
    features: IFeature[];
    tasks: ITask[];
    addNewFeatureToList: (feature: IFeature, projectId: number) => void;
    addNewTaskToList: (task: ITask) => void;
    goBack: () => void;
};

export interface IFeatureProps
{
    id: number;
    name: string;
    priority: number;
    progress: number;
    tasks: ITask[];
    addNewTaskToList: (task: ITask) => void;
};

export interface ITaskProps
{
    id: number;
    name: string;
    isFinished: boolean;
    setIsFinished: (taskId: number, isFinished: boolean) => any;
};