import { useParams } from 'react-router-dom';

import { useGetSectionsQuery } from './api/sectionsApi';
import { BoardColumn, BoardColumnSkeleton } from './components';

import styles from './Board.module.scss';

export const Board = () => {
	const { id: projectGid } = useParams() as { id: string };
	const { data: sections, isLoading: isSectionsLoading } =
		useGetSectionsQuery(projectGid);

	return (
		<div className={styles.board}>
			<div className={styles.content}>
				{isSectionsLoading ? (
					<BoardColumnSkeleton />
				) : (
					sections?.data.map((section) => (
						<BoardColumn
							key={section.gid}
							title={section.name}
							sectionGid={section.gid}
						/>
					))
				)}
			</div>
		</div>
	);
};
