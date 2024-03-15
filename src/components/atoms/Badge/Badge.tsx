import React from "react";

import styles from "./Badge.module.scss";
import classNames from "classnames";
import { BadgeType } from ".";
// import { BadgeEnum } from "./BadgeEnums";

export type BadgeProps = {
	text: string | number;
	variant?: BadgeType;
	className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
	text,
	variant = "light-blue",
	className,
}) => {
	return (
		<div className={classNames(styles.badge, styles[variant], className)}>
			<span>{text}</span>
		</div>
	);
};
