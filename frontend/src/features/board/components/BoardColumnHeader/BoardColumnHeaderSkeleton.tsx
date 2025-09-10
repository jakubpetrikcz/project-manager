import Skeleton from 'react-loading-skeleton';

import { Card } from '../../../../components/ui';

import styles from './BoardColumnHeaderSkeleton.module.scss';

export const BoardColumnHeaderSkeleton = () => {
  return (
    <Card className={styles.card}>
      <Skeleton width='100%' />
    </Card>
  );
};
