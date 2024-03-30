import { MouseEvent, ReactNode } from "react";

import styles from "./Button.module.scss";
import classNames from "classnames";
import { ButtonEnum } from "./ButtonEnums";

export type ButtonProps = {
	text?: string;
	icon?: ReactNode;
	variant?: ButtonEnum;
	onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	disabled?: boolean;
};

export const Button = ({
	text,
	icon,
	variant = ButtonEnum.primary,
	onClick,
	className,
	disabled = false,
}: ButtonProps) => {
	return (
		<button
			className={classNames(styles.button, styles[variant], className)}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
			{text}
		</button>
	);
};
