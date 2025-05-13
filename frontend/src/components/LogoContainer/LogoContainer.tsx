import { Dispatch, SetStateAction } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../icons/components';
import { MenuButton } from '../ui';

import styles from './LogoContainer.module.scss';

type LogoContainerProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const LogoContainer = ({ isOpen, setIsOpen }: LogoContainerProps) => {
	const toggleSidebar = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<div className={styles.logoContainer}>
			{isOpen && <img src='/logo.svg' alt='logo' />}
			<MenuButton
				icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				onClick={toggleSidebar}
			/>
		</div>
	);
};
