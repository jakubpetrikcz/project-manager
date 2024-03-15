import React, { ReactNode } from "react";

import styles from "./IconButton.module.scss";

type IconButtonProps = {
	icon?: ReactNode;
	onClick: () => void;
};

// TODO: Udělat IconButton pouze pro ty tři tečky a další tlačítka, které mají pouze ikonu bez stylů a vytvořit komponentu třeba MenuButton
// který bude na ten sidebar

export const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{icon}
		</button>
	);
};
