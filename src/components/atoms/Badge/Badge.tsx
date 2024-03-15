import React from "react";

import styles from "./Badge.module.scss";
import classNames from "classnames";
import { BadgeType } from ".";

export type BadgeProps = {
	text: string;
	variant?: BadgeType;
	className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
	text,
	variant = "light-blue",
	className,
}) => {
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
