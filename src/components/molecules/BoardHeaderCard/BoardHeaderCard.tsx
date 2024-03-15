import React from "react";

import styles from "./BoardHeaderCard.module.scss";
import { BoardHeaderType } from "../../../types/card";
import { HorizontalDotsIcon } from "../../icons";
import { Badge, Button } from "../../atoms";
import { useGetTasksQuery } from "../../../app/service/tasks";

export const BoardHeaderCard: React.FC<BoardHeaderType> = ({
	gid,
	title,
}) => {
	// console.log(gid);

	const {data, isLoading, isError} = useGetTasksQuery(gid);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) return <div>Error</div>;

	// console.log(data);

	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<span>{title}</span>
				<Badge text={data.data.length} />
			</div>
			<Button
				icon={<HorizontalDotsIcon />}
				onClick={() => {}}
				className={styles.icon}
			/>
		</div>
	);
};
