import { Link } from "react-router-dom";
import { Project } from "./Project"

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

function formatDescription(description: string) {
  return description.substring(0, 60) + '...';
}

export function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props;

  const handleEditClick = ((projectBeigEdited: Project) => {
    onEdit(projectBeigEdited)
  });

  return (
    <div className='card'>
      <img src={project.imageUrl} alt='Project'/>
      <section className='section dark'>
        <Link to={'/projects/' + project.id}>
          <h5 className='strong'>
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget: {project.budget.toLocaleString()}</p>
        </Link>
        <button className="bordered" onClick={() => {handleEditClick(project)}}>
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  )
}