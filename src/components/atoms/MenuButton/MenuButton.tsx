import React, { ReactNode } from "react";
import styles from "./MenuButton.module.scss";

type MenuButtonProps = {
	icon?: ReactNode;
	onClick: () => void;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ icon, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{icon}
		</button>
	);
};
