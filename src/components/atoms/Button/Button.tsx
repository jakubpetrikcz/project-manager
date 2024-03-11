import React, { MouseEvent, ReactNode } from "react";

import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
	text?: string;
	icon?: ReactNode;
	onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
	className?: string;
};

export const Button: React.FC<ButtonProps> = ({
	text,
	icon,
	onClick,
	className,
}) => {
	return (
		<button
			className={classNames(styles.button, className)}
			onClick={onClick}
		>
			{icon}
			{text}
		</button>
	);
};
