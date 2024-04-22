import React, { useEffect, useState } from "react";
import Project from "./components/Project";
import { IDebugData, IFeature, IProject, ITask } from "./types/sharedTypes";

function Main()
{
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() =>
  {
    (async () =>
    {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors" as RequestMode
      };
      const response = await fetch("/api/get-debug-data", init);
      const data = await response.json() as IDebugData;
      setProjects(data.projects);
      setTasks(data.tasks);
    })();
  }, []);


  const renderProjectList = (projectList: IProject[]) =>
  {
    if (projectList.length == 0)
    {
      return (
        <p>The list of Projects is empty.</p>
      );
    }

    const projectListRows: any[] = [];

    let i = 1;
    for (const project of projectList)
    {
      let description = project.description
      if (project.description.length > 40)
      {
        description = project.description.slice(0, 37) + "...";
      }
      projectListRows.push(
        <tr key={project.id}>
          <td>{i}</td>
          <td>{project.name}</td>
          <td>{description}</td>
        </tr>
      );
      i++;
    }

    return (
      <table className="project-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {projectListRows}
        </tbody>
      </table>
    );
  };

  const handleAddNewFeatureToList = (feature: IFeature) =>
  {
    const projectsCopy = [...projects];
    projectsCopy[0].features.push(feature);
    setProjects(projectsCopy);
  };

  const handleAddNewTaskToList = (task: ITask) =>
  {
    setTasks(([] as ITask[]).concat(tasks, task));
  };

  return (
    <div id="project-dashboard">
      {/* <div id="side-menu"></div> */}

      <div id="main-area">
        {/* {
          projects.length > 0 ?
           (
            <Project
              id={projects[0].id}
              name={projects[0].name}
              description={projects[0].description}
              features={projects[0].features}
              tasks={tasks}
              addNewFeatureToList={handleAddNewFeatureToList}
              addNewTaskToList={handleAddNewTaskToList}
            /> 
           ) : (
            <p>The list of Projects is empty.</p>
           )
        } */}
        <div className="project-list-table-container">
          {renderProjectList(projects)}
        </div>
      </div>
    </div>
  );
}

export default Main;