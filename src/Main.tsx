import React, { useEffect, useState, SyntheticEvent } from "react";
import Project from "./components/Project";
import { IDebugData, IFeature, IProject, ITask } from "./types/sharedTypes";

function Main()
{
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const [isNewProjectFormActive, setIsNewProjectFormActive] = useState<boolean>(false);
  // new project form inputs
  const [nameField, setNameField] = useState<string>("");
  const [descriptionField, setDescriptionField] = useState<string>("");

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


  const handleNewProjectInputChange = (event: SyntheticEvent, inputId: string) =>
  {
    const inputValue = (event.target as HTMLInputElement).value;
    
    if (inputId === "PROJECT_NAME_FIELD")
    {
      setNameField(inputValue);
    }
    else if (inputId === "PROJECT_DESCRIPTION_FIELD")
    {
      setDescriptionField(inputValue);
    }
  };

  const handleCreateNewProjectFormSubmit = async (event: SyntheticEvent) =>
  {
    event.preventDefault();

    interface IResponseData
    {
      success: boolean,
      errors: string[],
      payload: any
    };

    const submitData = {
      name: nameField,
      description: descriptionField
    }

    const payload = JSON.stringify(submitData);

    const requestInit = {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/json" }
    };

    const response = await fetch("/api/create-new-project", requestInit);

    if (response.ok)
    {
      const responseData = (await response.json()) as IResponseData;

      if (responseData.success)
      {
        const newProject: IProject = {
          id: (responseData.payload as { newProjectId: number }).newProjectId,
          name: nameField,
          description: descriptionField,
          features: []
        };

        setProjects(([] as IProject[]).concat(projects, newProject));
      }
    }
  }


  const handleCreateNewProjectFormCancel = (event: SyntheticEvent) =>
  {
    event.preventDefault();
    setIsNewProjectFormActive(false);
  }

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
      <div>
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

      {
        !isNewProjectFormActive ? (
          <button
            onClick={() => setIsNewProjectFormActive(!isNewProjectFormActive)}
          >new project</button>
        ) : (
          <form>
            <h3>Create New Project</h3>

            <div className="form-input-group">
              <label htmlFor="nameInput">name</label>
              <input
                id={"nameInput"}
                name={"nameInput"}
                type={"text"}
                value={nameField}
                placeholder={"name"}
                onChange={(ev: SyntheticEvent) => handleNewProjectInputChange(
                  ev,
                  "PROJECT_NAME_FIELD"
                )}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="descriptionInput">description</label>
              <input
                id={"descriptionInput"}
                name={"descriptionInput"}
                type={"text"}
                value={descriptionField}
                placeholder={"name"}
                onChange={(ev: SyntheticEvent) => handleNewProjectInputChange(
                  ev,
                  "PROJECT_DESCRIPTION_FIELD"
                )}
              />
            </div>

            <button
              onClick={handleCreateNewProjectFormSubmit}
            >submit</button>
            <button
              onClick={handleCreateNewProjectFormCancel}
            >close</button>
          </form>
        )
      }

      </div>
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

  const handleAddNewFeatureToList = (feature: IFeature, projectId: number) =>
  {
    const projectsCopy = [...projects];

    for (const currentProject of projectsCopy)
    {
      if (currentProject.id === projectId)
      {
        currentProject.features.push(feature);
        setProjects(projectsCopy);
        break;
      }
    }
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