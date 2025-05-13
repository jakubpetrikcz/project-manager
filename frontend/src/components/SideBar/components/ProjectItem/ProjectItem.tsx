import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Project } from '../../../../stores/types';

import styles from './ProjectItem.module.scss';

export const ProjectItem = ({ gid, name, color, icon }: Project) => {
	const { id: projectGid } = useParams() as { id: string };
	const navigate = useNavigate();
	const isActive = projectGid === gid;

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
