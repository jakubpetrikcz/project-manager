import React from "react";

import styles from "./Tag.module.scss";
import { Badge, BadgeProps } from "../Badge";

export const Tag: React.FC<BadgeProps> = ({ text, variant }) => {
	return <Badge text={text} variant={variant} className={styles.tag} />;
};
