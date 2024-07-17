import { useLocation } from 'react-router-dom';

import { useGetProjectQuery } from '../../../app/service/projectsApi';
import { useGetWorkspacesQuery } from '../../../app/service/workspacesApi';
import { WORKSPACE_GID_STORAGE_KEY } from '../../../constants';
import { PageHeader } from '../../molecules';
import { Board } from '../../templates';

import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
	const { pathname } = useLocation();
	const projectGid = pathname.slice(1, pathname.length);
	const {
		data: project,
		isLoading,
		isError,
	} = useGetProjectQuery(projectGid);
	const {
		data: workspaces,
		isLoading: isWorkspacesLoading,
		isError: isWorkspacesError,
	} = useGetWorkspacesQuery();

	if (isWorkspacesLoading || isLoading) return <div>Loading...</div>;

	if (isWorkspacesError || !workspaces || isError || !project) return null;

	if (workspaces) {
		localStorage.setItem(WORKSPACE_GID_STORAGE_KEY, workspaces.data[0].gid);
	}

	return (
		<section className={styles.section}>
			<PageHeader title={project.data.name} />
			<Board />
		</section>
	);
};
