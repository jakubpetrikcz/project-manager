import React from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
	text?: string;
	icon?: string;
	onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{icon && <img src={icon} alt="icon" />}
			{text}
		</button>
	);
};

export default Button;
