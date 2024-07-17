import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Project } from '../../../app/types';
import { PROJECT_GID_STORAGE_KEY } from '../../../constants';

import styles from './ProjectItem.module.scss';

export const ProjectItem = ({ gid, name, color, icon }: Project) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const projectGid = pathname.slice(1, pathname.length);
	const isActive = projectGid === gid;

	if (projectGid) {
		localStorage.setItem(PROJECT_GID_STORAGE_KEY, projectGid);
	}

	return (
		<div
			className={classNames(styles.project, {
				[styles.active]: isActive,
			})}
			onClick={() => navigate(`${gid}`)}
		>
			<div className={classNames(styles.icon, styles[color])}>
				<img src={`/${icon}.svg`} alt='icon' />
			</div>
			{name}
		</div>
	);
};
