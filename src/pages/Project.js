import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import TaskComponent from "../components/TaskComponent";
import { toast } from "react-toastify";

const statuses = [
    { value: "backlog", label: "Backlog" },
    { value: "to-do", label: "To Do" },
    { value: "in-progress", label: "In progress" },
    { value: "done", label: "Done" },
];

const Project = () => {
  const [tasks, setTasks] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});
  const { projectId } = useParams();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/task/get-tasks/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error("Get tasks error:", error);
      }
    };

    getTasks();
  }, [projectId]);


  useEffect(() => {
    const grouped = tasks.reduce((acc, task) => {
      if (!acc[task.status]) acc[task.status] = [];
      acc[task.status].push(task);
      return acc;
    }, {});

    setGroupedTasks(grouped);
  }, [tasks]);

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/task/delete-task/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        toast.success("Task deleted successfully!");
      }
    } catch (error) {
      toast.error("Delete task error:", error);
    }
  }
    

  console.log(groupedTasks);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 m-8">
        {statuses.map(({ value, label }) => (
          <div key={value} className="bg-gray-100 p-4 rounded-md">
            <h1 className="text-xl font-bold mb-4">{label}</h1>
            {groupedTasks[value] && groupedTasks[value].length > 0 ? (
              groupedTasks[value].map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-700 shadow-md rounded-md p-4 w-[250px] h-40 mb-4 mx-auto"
                >
                  <TaskComponent task={task} deleteTask={deleteTask} />
                </div>
              ))
            ) : (
              <p className="text-gray-500"> I'm waiting</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
