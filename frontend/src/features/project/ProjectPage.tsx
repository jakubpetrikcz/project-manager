import { useParams } from 'react-router-dom';

import { PageHeader, PageHeaderSkeleton } from '../../components/ui';
import { useGetProjectQuery } from '../../stores/service/projectsApi';
import { Board } from '../board/Board';
import { BoardSkeleton } from '../board/BoardSkeleton';

import styles from './ProjectPage.module.scss';

export const ProjectPage = () => {
  const { id: projectGid } = useParams() as { id: string };
  const { data: project, isLoading } = useGetProjectQuery(projectGid);

  return (
    <section className={styles.section}>
      {isLoading ? (
        <>
          <PageHeaderSkeleton />
          <BoardSkeleton />
        </>
      ) : (
        <>
          <PageHeader title={project?.data.name} />
          <Board />
        </>
      )}
    </section>
  );
};
