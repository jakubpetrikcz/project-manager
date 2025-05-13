import { useParams } from 'react-router-dom';

import { PageHeader } from '../../components/ui';
import { useGetProjectQuery } from '../../stores/service/projectsApi';
import { Board } from '../board/Board';

import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
	const { id: projectGid } = useParams() as { id: string };
	const {
		data: project,
		isLoading,
		isError,
	} = useGetProjectQuery(projectGid);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !project) return null;

	return (
		<section className={styles.section}>
			<PageHeader title={project.data.name} />
			<Board />
		</section>
	);
};
