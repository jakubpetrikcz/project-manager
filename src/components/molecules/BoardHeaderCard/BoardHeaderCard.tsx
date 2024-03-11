import React from "react";

import styles from "./BoardHeaderCard.module.scss";
import { BoardHeaderType } from "../../../types/card";
import { HorizontalDotsIcon } from "../../icons";
import { Badge, Button } from "../../atoms";

export const BoardHeaderCard: React.FC<BoardHeaderType> = ({
	title,
	count,
}) => {
	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<span>{title}</span>
				<Badge text={count} />
			</div>
			<Button
				icon={<HorizontalDotsIcon />}
				onClick={() => {}}
				className={styles.icon}
			/>
		</div>
	);
};
