import { useGetSectionsQuery } from '../../../app/service/sectionsApi';
import { PROJECT_GID_STORAGE_KEY } from '../../../constants';
import { BoardHeaderSection, BoardSection } from '../../molecules';

import styles from './Board.module.scss';

export const Board = () => {
	const projectGid = localStorage.getItem(PROJECT_GID_STORAGE_KEY);
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
					<BoardHeaderSection
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
