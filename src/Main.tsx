import React, { useEffect, useState } from "react";
import Project from "./components/Project";
import { IDebugData, IProject } from "./types/sharedTypes";

function Main()
{
  const [message, setMessage] = useState<string>("");
  const [projects, setProjects] = useState<IProject[]>([]);

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
      // setMessage(data.message);
      setProjects(data.projects);
    })();
  }, []);

  // return (
  //   <div id="project-dashboard">
  //     <div id="side-menu">

  //     </div>

  //     <div id="main-project-list">
  //       <div className="project">
  //         <h2 className="project-title">{"My Project 1"}</h2>
  //         <p className="project__description">
  //           {projectDescriptionPlaceholder}
  //         </p>
  //         <ul className="list-of-features">
  //           <li>feature 1 (priority=1, core feature); isFinished=false</li>
  //           <li>feature 2 (priority=1, core feature); isFinished=false</li>
  //           <li>feature 3 (priority=1, core feature); isFinished=true</li>
  //           <li>feature 4 (priority=2); isFinished=false</li>
  //           <li>feature 5 (priority=3); isFinished=false</li>
  //         </ul>
  //       </div>


  //       <div className="project">
  //         <h2 className="project-title">{"My Project 2"}</h2>
  //         <p className="project__description">
  //           {projectDescriptionPlaceholder}
  //         </p>
  //         <ul className="list-of-features">
  //           <li>feature 1 (priority=1, core feature); isFinished=false</li>
  //           <li>feature 2 (priority=2); isFinished=true</li>
  //         </ul>
  //       </div>

  //     </div>
  //   </div>
  // );

  return (
    <div id="project-dashboard">
      <div id="side-menu"></div>

      <div id="main-area">
        {
          projects.length > 0 ?
           (
            <Project
              name={projects[0].name}
              description={projects[0].description}
              features={projects[0].features}
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