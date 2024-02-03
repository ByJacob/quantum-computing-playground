import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { JSX } from 'react/jsx-runtime';

const ProjectCardSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    viewBox="0 0 330 404"
    height={404}
    width={330}
    speed={3}
    backgroundColor="#e0e0e0"
    foregroundColor="#c7c7c7"
    {...props}
  >
    <rect x="6" y="3" rx="10" ry="10" width="330" height="192" />
    <rect x="20" y="210" rx="0" ry="0" width="239" height="32" />
    <rect x="20" y="250" rx="0" ry="0" width="200" height="20" />
    <rect x="20" y="280" rx="0" ry="0" width="150" height="20" />
    <rect x="20" y="310" rx="0" ry="0" width="72" height="42" />
  </ContentLoader>
);

export default ProjectCardSkeleton;