import { useGetWorkspacesQuery } from '../../../../stores/service/workspacesApi';
import { ProjectItemSkeleton } from '../ProjectItem';
import { Projects } from '../Projects/Projects';

import styles from './Spaces.module.scss';

export const Spaces = () => {
  const {
    data: workspaces,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useGetWorkspacesQuery();

  if (isWorkspacesError) return <div>Error</div>;

  return (
    <div className={styles.container}>
      <h5>Projects</h5>
      {isWorkspacesLoading || !workspaces ? (
        <ProjectItemSkeleton projects={2} />
      ) : (
        <Projects workspaceId={workspaces.data[0].gid} />
      )}
    </div>
  );
};
