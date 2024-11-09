import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [projects, setProjects] = useState();
  const navigate = useNavigate();

  const createProject = () => {
    navigate('/create-project');
  };

  const getProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/project/get-projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <div className='flex justify-end'>
        <button  className=' bg-slate-900 rounded-full px-4 py-1 mt-6 mr-8' onClick={createProject}>
          <h1 className="text-white font-semibold align-middle"> add project </h1>
        </button>
      </div>

      <div className='w-full flex flex-col items-center mt-32'>
        <h1 className='text-2xl font-semibold mb-6'>Projects</h1>
        {Array.isArray(projects) && projects.length > 0 ? (projects?.map((project) => (
          <div className='w-96 flex flex-row justify-between bg-gray-800 p-4 my-2 rounded-lg'>
            <h1 className='text-lg text-white font-semibold'>{project.name}</h1>
            <button className='bg-gray-100 rounded-full px-4 py-1' onClick={() => navigate(`/project/${project._id}`)}> view </button>
          </div>
        ))) : <h1 className='text-lg mt-8'>Add your first project</h1>}
      </div>

    </div>
  );
};

export default Home;
