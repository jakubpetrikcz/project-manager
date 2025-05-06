import { useGetProjectsQuery } from '../../../../stores/service/projectsApi';
import { useGetWorkspacesQuery } from '../../../../stores/service/workspacesApi';
import { ProjectItem } from '../ProjectItem';

import styles from './Projects.module.scss';

export const Projects = () => {
	const {
		data: workspaces,
		isLoading: isWorkspacesLoading,
		isError: isWorkspacesError,
	} = useGetWorkspacesQuery();
	const {
		data: projects,
		isLoading,
		isError,
	} = useGetProjectsQuery(workspaces?.data[0].gid);

	if (isLoading || isWorkspacesLoading) return <div>Loading...</div>;

	if (isError || !projects || isWorkspacesError || !workspaces)
		return <div>Error</div>;

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
