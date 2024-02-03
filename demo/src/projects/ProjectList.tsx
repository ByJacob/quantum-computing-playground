import { useState } from 'react';
import { Project } from './Project';
import { ProjectCard } from './ProjectCard';
import { ProjectForm } from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  const handleEvent = (project: Project) => setProjectBeingEdited(project);
  const cancelEditing = () => setProjectBeingEdited({});
  const items = projects.map((project: Project) => {
    return <div key={project.id} className='cols=sm'>
      {project === projectBeingEdited ? (
        <ProjectForm onCancel={cancelEditing} onSave={onSave} project={project}/>
      ) : (
        <ProjectCard project={project} onEdit={handleEvent}></ProjectCard>
      )}
    </div>
  })
  return (<div className='row'>
      { items }
    </div>
  )
}

export default ProjectList;