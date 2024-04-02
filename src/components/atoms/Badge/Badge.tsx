import { BadgeTypeEnum } from ".";
import styles from "./Badge.module.scss";
import classNames from "classnames";

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
	const oneChar = text.length === 1;

	return (
		<div
			className={classNames(styles.badge, styles[variant], className, {
				[styles.one]: oneChar,
			})}
		>
			<span>{text}</span>
		</div>
	);
};
