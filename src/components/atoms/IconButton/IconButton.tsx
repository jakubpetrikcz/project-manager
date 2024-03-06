import React, { ReactNode } from "react";

import styles from "./IconButton.module.scss";

type IconButtonProps = {
	icon?: ReactNode;
	onClick: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{icon}
		</button>
	);
};

export default IconButton;
