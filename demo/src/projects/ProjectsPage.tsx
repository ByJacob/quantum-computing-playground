import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import { Project } from './Project';
// import { projectAPI } from './projectAPI';
import ProjectListSkeleton from './ProjectListSkeleton';
import { MOCK_PROJECTS } from './MockProjects';

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const saveProject = (project: Project) => {
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? new Project(project) : p;
    });
    setProjects(updatedProjects);
    // projectAPI.put(project)
    //   .then((updatedProject) => {
    //     let updatedProjects = projects.map((p: Project) => {
    //       return p.id === project.id ? new Project(updatedProject) : p;
    //     });
    //     setProjects(updatedProjects);
    //   })
  }

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  useEffect(() => {
    setLoading(true);
    try {
      // projectAPI.get(currentPage, 5)
      //   .then((data) => {
      //     setError(undefined);
      //     if (currentPage === 1) {
      //       setProjects(data)
      //     } else {
      //       setProjects((projects) => {
      //         return [...projects, ...data];
      //       })
      //     }
      //   })
      //   .catch((e) => {
      //     console.log('Loading false');
      //     setError(e.message);
      //   })
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    } finally {
      setLoading(false)
    }
  }, [loading, currentPage])

  return (
    <>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={saveProject}></ProjectList>
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <ProjectListSkeleton />}
    </>
  )
}

export default ProjectsPage;