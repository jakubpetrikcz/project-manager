import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { NavLinkType } from '../../../types/navLink';

import styles from './NavItem.module.scss';

export const NavItem = ({ name, icon, fillIcon, path }: NavLinkType) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    <Link
      to={path}
      className={classNames(styles.link, { [styles.active]: isActive })}
    >
      {isActive ? fillIcon : icon}
      <p>{name}</p>
    </Link>
  );
};
