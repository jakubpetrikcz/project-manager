import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Project } from '../../../../stores/types';

import styles from './ProjectItem.module.scss';

export const ProjectItem = ({ gid, name, color, icon }: Project) => (
  <NavLink
    className={({ isActive }) =>
      classNames(styles.project, {
        [styles.active]: isActive,
      })
    }
    to={gid}
  >
    <div className={classNames(styles.icon, styles[color])}>
      <img src={`/${icon}.svg`} alt='icon' />
    </div>
    {name}
  </NavLink>
);
