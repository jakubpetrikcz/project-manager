import { ReactNode } from 'react';

import styles from './MenuButton.module.scss';

type MenuButtonProps = {
	icon: ReactNode;
	onClick: () => void;
};

export const MenuButton = ({ icon, onClick }: MenuButtonProps) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{icon}
		</button>
	);
};
