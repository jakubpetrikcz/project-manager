import { BoardColumnSkeleton } from './components';

import styles from './BoardSkeleton.module.scss';

export const BoardSkeleton = () => {
  return (
    <div className={styles.board}>
      <div className={styles.content}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <BoardColumnSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};
