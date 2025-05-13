import { useGetWorkspacesQuery } from '../../../../stores/service/workspacesApi';
import { Projects } from '../Projects/Projects';

import styles from './Spaces.module.scss';

export const Spaces = () => {
	const {
		data: workspaces,
		isLoading: isWorkspacesLoading,
		isError: isWorkspacesError,
	} = useGetWorkspacesQuery();

	if (isWorkspacesLoading) return <div>Loading...</div>;

	if (isWorkspacesError || !workspaces) return <div>Error</div>;

	return (
		<div className={styles.container}>
			<h5>Projects</h5>
			<Projects workspaceId={workspaces.data[0].gid} />
		</div>
	);
};
