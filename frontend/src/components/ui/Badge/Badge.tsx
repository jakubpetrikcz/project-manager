import classNames from 'classnames';

import { BadgeTypeEnum } from '.';

import styles from './Badge.module.scss';

export type BadgeProps = {
	text: string;
	variant?: BadgeTypeEnum;
	className?: string;
};

export const Badge = ({
	text,
	variant = BadgeTypeEnum.lightBlue,
	className,
}: BadgeProps) => {
	const hasOneChar = text.length === 1;

	return (
		<div
			className={classNames(styles.badge, styles[variant], className, {
				[styles.one]: hasOneChar,
			})}
		>
			<span>{text}</span>
		</div>
	);
};
