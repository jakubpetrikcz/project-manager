import Skeleton from 'react-loading-skeleton';

import { Card } from '../../../../components/ui';

import styles from './BoardCardSkeleton.module.scss';

type BoardCardSkeletonProps = {
	cards: number;
};

export const BoardCardSkeleton = ({ cards }: BoardCardSkeletonProps) => {
	return (
		<div className={styles.cards}>
			{Array(cards)
				.fill(0)
				.map((_, i) => (
					<Card className={styles.card} key={i}>
						<Skeleton width='100%' />
						<Skeleton width='100%' />
					</Card>
				))}
		</div>
	);
};
