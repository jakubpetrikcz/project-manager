import Skeleton from 'react-loading-skeleton';

import styles from './PageHeaderSkeleton.module.scss';

export const PageHeaderSkeleton = () => {
  return (
    <div className={styles.pageHeader}>
      <Skeleton height={60} />
    </div>
  );
};
