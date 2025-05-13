import { useGetProjectsQuery } from '../../../../stores/service/projectsApi';
import { ProjectItem } from '../ProjectItem';

import styles from './Projects.module.scss';

type ProjectsProps = {
	workspaceId: string;
};

export const Projects = ({ workspaceId }: ProjectsProps) => {
	const {
		data: projects,
		isLoading,
		isError,
	} = useGetProjectsQuery(workspaceId);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !projects) return <div>Error</div>;

	return (
		<div className={styles.workspaces}>
			{projects.data.map((project) => (
				<ProjectItem key={project.gid} {...project} />
			))}
		</div>
	);
};
