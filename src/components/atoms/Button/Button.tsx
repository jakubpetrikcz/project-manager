import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

import { ButtonEnum } from './ButtonEnums';

import styles from './Button.module.scss';

export type ButtonProps = {
	text: string;
	link?: string;
	icon?: ReactNode;
	variant?: ButtonEnum;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	disabled?: boolean;
};

export const Button = ({
	text,
	link,
	icon,
	variant = ButtonEnum.primary,
	onClick,
	className,
	disabled = false,
}: ButtonProps) => {
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(event);
		}
		if (link) {
			window.open(link, '_blank');
		}
	};

	return (
		<button
			className={classNames(styles.button, styles[variant], className)}
			onClick={handleClick}
			disabled={disabled}
		>
			{icon}
			{text}
		</button>
	);
};
