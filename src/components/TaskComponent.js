import React from "react";
import { useNavigate } from "react-router-dom";


const TaskComponent = ( {task, deleteTask}) => {
    const navigate = useNavigate();
    const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    return (
        <div className="" >
            <h2 className="text-lg  text-white font-semibold">{task.name}</h2>
            <p className="text-sm text-gray-400"> created: {formattedDate}</p>
            <button className="bg-green-600 text-white rounded-xl px-3 py-0.5 mt-10" onClick={() => {navigate(`edit-task/${task._id}`)}}>edit</button>
            <button className="bg-red-900 text-white rounded-xl px-3 py-0.5 mt-10 ml-24" onClick={() => deleteTask(task._id) }>delete</button>
            
        </div>
    );
}

export default TaskComponent;