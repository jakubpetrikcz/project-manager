import { MouseEvent, ReactNode } from "react";
import classNames from "classnames";

import { ButtonEnum } from "./ButtonEnums";

import styles from "./Button.module.scss";

export type ButtonProps = {
	text: string;
	icon?: ReactNode;
	variant?: ButtonEnum;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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
