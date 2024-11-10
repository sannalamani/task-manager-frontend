import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateTaskForm from '../../components/forms/CreateTaskForm';

const EditTaskWrapper = () => {
  const { taskId } = useParams();  
  const [task, setTask] = useState(null);


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/task/get-task/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTask(data); 
        } else {
          console.error('Failed to fetch project');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (taskId) {
      fetchTask(); 
    }
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>; 
  }

  return <CreateTaskForm task={task} />; 
};

export default EditTaskWrapper;