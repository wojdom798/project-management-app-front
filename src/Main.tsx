import React, { useEffect, useState } from "react";
import Project from "./components/Project";
import { IDebugData, IProject, ITask } from "./types/sharedTypes";

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

  return (
    <div id="project-dashboard">
      {/* <div id="side-menu"></div> */}

      <div id="main-area">
        {
          projects.length > 0 ?
           (
            <Project
              id={projects[0].id}
              name={projects[0].name}
              description={projects[0].description}
              features={projects[0].features}
              tasks={tasks}
            /> 
           ) : (
            <p>The list of Projects is empty.</p>
           )
        }
      </div>
    </div>
  );
}

export default Main;