import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

const Project = () => {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();

    const getProject = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/project/get-project/${projectId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setProject(data);
            }
        } catch (error) {
            console.error("Get project error:", error);
        }
    }

    useEffect(() => {
        getProject();
    }, []);

    return (
      <div>
        <div className="h-16 flex m-8 bg-blue-200 items-center rounded-full">
          <h1 className="text-2xl font-bold ml-8"> {project?.name} </h1>
          <button className="bg-slate-900 text-white rounded-2xl px-4 py-1 ml-auto mr-8">  add task </button>
        </div>
      </div>
    );
    };

    export default Project;