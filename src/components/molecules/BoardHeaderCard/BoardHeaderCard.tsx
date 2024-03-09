import React from "react";

import styles from "./BoardHeaderCard.module.scss";
import Badge from "../../atoms/Badge/Badge";
import { BoardHeaderType } from "../../../types/card";

const BoardHeaderCard: React.FC<BoardHeaderType> = ({ title, count }) => {
	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<span>{title}</span>
				<Badge text={count} />
			</div>
			<img src="/ellipsis-solid.svg" alt="icon" />
		</div>
	);
};

export default BoardHeaderCard;
