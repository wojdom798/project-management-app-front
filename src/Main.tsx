import React, { useEffect, useState, SyntheticEvent } from "react";
import Project from "./components/Project";
import { IDebugData, IFeature, IProject, ITask } from "./types/sharedTypes";

function Main()
{
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

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
          <td>
            <button
              className="button-1"
              onClick={ () => setSelectedProjectId(project.id) }
            >select</button>
          </td>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projectListRows}
        </tbody>
      </table>
    );
  };

  const renderProject = () =>
  {
    if (selectedProjectId === null)
    {
      return (
        <div className="project-list-table-container">
          {renderProjectList(projects)}
        </div>
      );
    }

    let selectedProject: IProject | null = null;

    for (const project of projects)
    {
      if (project.id === selectedProjectId)
      {
        selectedProject = project;
        break;
      }
    }

    if (!selectedProject)
    {
      return (<p>selected project does not exist (error).</p>);
    }

    return (
      <Project
        id={selectedProject.id}
        name={selectedProject.name}
        description={selectedProject.description}
        features={selectedProject.features}
        tasks={tasks}
        addNewFeatureToList={handleAddNewFeatureToList}
        addNewTaskToList={handleAddNewTaskToList}
        goBack={handleProjectGoBackButtonClick}
      />
    );
  };

  const handleProjectGoBackButtonClick = () =>
  {
    setSelectedProjectId(null);
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

        {/* <div className="project-list-table-container">
          {renderProjectList(projects)}
        </div> */}

        {renderProject()}

      </div>
    </div>
  );
}

export default Main;