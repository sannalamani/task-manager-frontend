import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import  Collaborators from "../../utils/project/Collaborators";


const ProjectHeader = ({ project }) => {

  const [showCollaborators, setShowCollaborators] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <div className="h-16 flex m-8 bg-blue-200 items-center justify-between rounded-full">
        <h1 className="text-2xl font-bold ml-8"> {project?.name} </h1>
        <div>
          <button
            className="bg-slate-900 text-white rounded-2xl px-4 py-1 ml-auto mr-8"
            onClick={() => {
              setShowCollaborators(!showCollaborators);
            }}
          >
            {" "}
            collaborator{" "}
          </button>
          <button
            className="bg-slate-900 text-white rounded-2xl px-4 py-1 ml-auto mr-8"
            onClick={() => {
              navigate(`create-task`);
            }}
          >
            {" "}
            add task{" "}
          </button>
        </div>
      </div>
      {showCollaborators && <Collaborators project={project} />}
      <Outlet />
    </div>
  );
}       

export default ProjectHeader;