import React from "react";
import AddCollaboratorForm from "../../components/forms/AddCollaboratorForm";

const Collaborators = ({ project }) => {

    console.log(project);
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Collaborators</h2>
            {project?.members?.map((collaborator) => (
                <div key={collaborator._id} className="flex items-center">
                    <div className="bg-slate-200 px-8 py-2 rounded-xl">
                        <p className="text-2xl font-semibold">{collaborator.name}</p>
                    </div>
                </div>
            ))}

            <AddCollaboratorForm project={project}/>

        </div>
    );
}

export default Collaborators;
        
            















