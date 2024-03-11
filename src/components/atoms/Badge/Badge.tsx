import React from "react";

import styles from "./Badge.module.scss";
import classNames from "classnames";
import { BadgeEnum } from "./BadgeEnums";

export type BadgeProps = {
	text: string | number;
	variant?: BadgeEnum;
	className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
	text,
	variant = BadgeEnum.primary,
	className,
}) => {
	return (
		<div className={classNames(styles.badge, styles[variant], className)}>
			<span>{text}</span>
		</div>
	);
};
