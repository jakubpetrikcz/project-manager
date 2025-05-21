import { useParams } from 'react-router-dom';

import { useGetSectionsQuery } from './api/sectionsApi';
import { BoardColumn } from './components';

import styles from './Board.module.scss';

export const Board = () => {
	const { id: projectGid } = useParams() as { id: string };
	const {
		data: sections,
		isLoading: isSectionsLoading,
		isError: isSectionsError,
	} = useGetSectionsQuery(projectGid);

	if (isSectionsLoading) return <div>Loading...</div>;

	if (isSectionsError || !sections) return <div>Error</div>;

	return (
		<div className={styles.board}>
			<div className={styles.content}>
				{sections.data.map((section) => (
					<BoardColumn
						key={section.gid}
						title={section.name}
						sectionGid={section.gid}
					/>
				))}
			</div>
		</div>
	);
};
