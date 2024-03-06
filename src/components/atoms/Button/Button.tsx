import React, { ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
	text?: string;
	icon?: ReactNode;
	onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{icon}
			{text}
		</button>
	);
};

export default Button;
