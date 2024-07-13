import { useState } from 'react';
import classNames from 'classnames';

import { LogoContainer, NavMenu } from '../../molecules';

import styles from './SideBar.module.scss';

export const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={classNames(styles.sidebar, { [styles.active]: isOpen })}
		>
			<LogoContainer isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && <NavMenu />}
		</div>
	);
};
