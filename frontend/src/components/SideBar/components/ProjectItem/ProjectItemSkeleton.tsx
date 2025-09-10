import Skeleton from 'react-loading-skeleton';

import styles from './ProjectItemSkeleton.module.scss';

type ProjectItemSkeletonProps = {
  projects: number;
};

export const ProjectItemSkeleton = ({ projects }: ProjectItemSkeletonProps) => {
  return Array(projects)
    .fill(0)
    .map((_, i) => (
      <div className={styles.project} key={i}>
        <Skeleton circle width={40} height={40} />
        <div className={styles.name}>
          <Skeleton />
        </div>
      </div>
    ));
};
