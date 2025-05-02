import { WORKSPACE_GID_STORAGE_KEY } from '../../../../constants';
import { useGetProjectsQuery } from '../../../../stores/service/projectsApi';
import { ProjectItem } from '../ProjectItem';

import styles from './Projects.module.scss';

export const Projects = () => {
	const {
		data: projects,
		isLoading,
		isError,
	} = useGetProjectsQuery(
		localStorage.getItem(WORKSPACE_GID_STORAGE_KEY) || ''
	);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !projects) return <div>Error</div>;

	return (
		<div className={styles.container}>
			<h5>Projects</h5>
			<div className={styles.workspaces}>
				{projects.data.map((project) => (
					<ProjectItem key={project.gid} {...project} />
				))}
			</div>
		</div>
	);
};
