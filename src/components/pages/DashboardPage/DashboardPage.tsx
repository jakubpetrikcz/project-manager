import { useGetProjectsQuery } from '../../../app/service/projectsApi';
import { useGetWorkspacesQuery } from '../../../app/service/workspacesApi';
import {
	PROJECT_GID_STORAGE_KEY,
	WORKSPACE_GID_STORAGE_KEY,
} from '../../../constants';
import { PageHeader } from '../../molecules';
import { Board } from '../../templates';

import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
	const { data: projects, isLoading, isError } = useGetProjectsQuery();
	const {
		data: workspaces,
		isLoading: isWorkspacesLoading,
		isError: isWorkspacesError,
	} = useGetWorkspacesQuery();

	if (isLoading || isWorkspacesLoading) return <div>Loading...</div>;

	if (isError || !projects || isWorkspacesError || !workspaces) return null;

	console.log(projects);

	if (projects) {
		localStorage.setItem(PROJECT_GID_STORAGE_KEY, projects.data[0].gid);
	}

	if (workspaces) {
		localStorage.setItem(WORKSPACE_GID_STORAGE_KEY, workspaces.data[0].gid);
	}

	return (
		<section className={styles.section}>
			<PageHeader title='HealthTracker' />
			<Board />
		</section>
	);
};
