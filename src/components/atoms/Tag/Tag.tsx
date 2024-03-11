import React from "react";
import Badge, { BadgeProps } from "../Badge/Badge";

import styles from "./Tag.module.scss";

const Tag: React.FC<BadgeProps> = ({ text, variant }) => {
	return <Badge text={text} variant={variant} className={styles.tag} />;
};

export default Tag;
