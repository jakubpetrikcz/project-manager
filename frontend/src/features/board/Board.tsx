import { useParams } from 'react-router-dom';

import { useGetSectionsQuery } from './api/sectionsApi';
import { BoardSection, BoardSectionHeader } from './components';

import styles from './Board.module.scss';

export const Board = () => {
	const { id: projectGid } = useParams() as { id: string };
	const {
		data: headers,
		isLoading: isHeadersLoading,
		isError: isHeadersError,
	} = useGetSectionsQuery(projectGid);

	if (isHeadersLoading) return <div>Loading...</div>;

	if (isHeadersError || !headers) return <div>Error</div>;

	return (
		<div className={styles.board}>
			<div className={styles.header}>
				{headers.data.map((header) => (
					<BoardSectionHeader
						key={header.gid}
						title={header.name}
						gid={header.gid}
					/>
				))}
			</div>
			<div className={styles.content}>
				{headers.data.map((header) => (
					<BoardSection key={header.gid} sectionGid={header.gid} />
				))}
			</div>
		</div>
	);
};
