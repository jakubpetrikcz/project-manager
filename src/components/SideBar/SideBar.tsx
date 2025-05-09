import { useState } from 'react';
import classNames from 'classnames';

import { LogoContainer } from '../LogoContainer';
import { NavMenu } from '../NavMenu';

import { Projects } from './components/Projects';

import styles from './SideBar.module.scss';

export const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={classNames(styles.sidebar, { [styles.active]: isOpen })}
		>
			<LogoContainer isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && (
				<>
					<NavMenu />
					<Projects />
				</>
			)}
		</div>
	);
};
