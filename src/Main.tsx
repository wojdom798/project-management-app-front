import React, { useEffect, useState } from "react";
import Project from "./components/Project";

const projectDescriptionPlaceholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa eget egestas purus viverra accumsan in nisl nisi. Nibh cras pulvinar mattis nunc sed blandit. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Vulputate enim nulla aliquet porttitor. Pulvinar neque laoreet suspendisse interdum. Nullam non nisi est sit amet facilisis magna. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Mus mauris vitae ultricies leo integer malesuada nunc. Pellentesque elit eget gravida cum sociis. Scelerisque varius morbi enim nunc faucibus. Faucibus pulvinar elementum integer enim neque. Sociis natoque penatibus et magnis dis parturient montes. Vel risus commodo viverra maecenas accumsan lacus."

function Main()
{
  const [message, setMessage] = useState<string>("");

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
      const response = await fetch("/api/test", init);
      const data = await response.json();
      setMessage(data.message);
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
        <Project descriptionPlaceholder={projectDescriptionPlaceholder} />
      </div>
    </div>
  );
}

export default Main;