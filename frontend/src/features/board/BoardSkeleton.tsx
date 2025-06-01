import { BoardColumnSkeleton } from './components';

import styles from './BoardSkeleton.module.scss';

export const BoardSkeleton = () => {
	return (
		<div className={styles.board}>
			<div className={styles.content}>
				<BoardColumnSkeleton />
			</div>
		</div>
	);
};
