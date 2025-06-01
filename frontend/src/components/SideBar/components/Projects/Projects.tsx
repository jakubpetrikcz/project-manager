import { useGetProjectsQuery } from '../../../../stores/service/projectsApi';
import { ProjectItem, ProjectItemSkeleton } from '../ProjectItem';

import styles from './Projects.module.scss';

type ProjectsProps = {
  workspaceId: string;
};

export const Projects = ({ workspaceId }: ProjectsProps) => {
  const { data: projects, isLoading } = useGetProjectsQuery(workspaceId);

  return (
    <div className={styles.workspaces}>
      {isLoading ? (
        <ProjectItemSkeleton projects={2} />
      ) : (
        projects?.data.map((project) => (
          <ProjectItem key={project.gid} {...project} />
        ))
      )}
    </div>
  );
};
