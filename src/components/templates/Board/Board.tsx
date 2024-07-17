import { useLocation } from 'react-router-dom';

import { useGetSectionsQuery } from '../../../app/service/sectionsApi';
import { BoardHeaderSection, BoardSection } from '../../molecules';

import styles from './Board.module.scss';

export const Board = () => {
	const { pathname } = useLocation();
	const projectGid = pathname.slice(1, pathname.length);
	console.log(projectGid);
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
