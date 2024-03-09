import React from "react";

import styles from "./Badge.module.scss";
import classNames from "classnames";

type BadgeProps = {
	text: string | number;
	variant?: string;
};

const Badge: React.FC<BadgeProps> = ({ text, variant = "primary" }) => {
	return (
		<div className={classNames(styles.badge, styles[variant])}>
			<span>{text}</span>
		</div>
	);
};

export default Badge;
