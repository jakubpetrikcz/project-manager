import styles from "./Badge.module.scss";
import classNames from "classnames";
import { BadgeType } from "./BadgeTypes";

export type BadgeProps = {
	text: string;
	variant?: BadgeType;
	className?: string;
};

export const Badge = ({
	text,
	variant = BadgeType.lightBlue,
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
