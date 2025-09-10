import { BoardCardSkeleton } from '../BoardCard/BoardCardSkeleton';
import { BoardColumnHeaderSkeleton } from '../BoardColumnHeader';

import styles from './BoardColumnSkeleton.module.scss';

export const BoardColumnSkeleton = () => {
  return (
    <div className={styles.column}>
      <BoardColumnHeaderSkeleton />

      <div className={styles.container}>
        <BoardCardSkeleton cards={2} />
      </div>
    </div>
  );
};
