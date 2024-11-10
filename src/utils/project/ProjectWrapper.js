import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from '../../components/layout/ProjectHeader';

const ProjectWrapper = () => {
  const { projectId } = useParams();  
  const [project, setProject] = useState(null);


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/project/get-project/${projectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProject(data); 
        } else {
          console.error('Failed to fetch project');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (projectId) {
      fetchProject(); 
    }
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>; 
  }

  console.log('project:', project);

  return <ProjectHeader project={project} />; 
};

export default ProjectWrapper;
