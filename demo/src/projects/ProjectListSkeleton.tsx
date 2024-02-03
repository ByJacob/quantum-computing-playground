import React from 'react';
import ProjectCardSkeleton from './ProjectCardSkeleton';

const ProjectListSkeleton = () => {
  const numberOfItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const items = numberOfItems.map((item) => (
    <ProjectCardSkeleton key={item} />
  ));
  return <div className="row">{items}</div>;
};

export default ProjectListSkeleton;