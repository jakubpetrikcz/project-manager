import React from "react";

import { useGetTasksQuery } from "../../../app/service/tasks";
import { BoardCard } from "../BoardCard";

import styles from "./BoardSection.module.scss";

type BoardSectionProps = {
	gid?: string;
};

export const BoardSection: React.FC<BoardSectionProps> = ({ gid }) => {
	const { data: tasks, isLoading, isError } = useGetTasksQuery(gid);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !tasks) return <div>Error</div>;

	return (
		<section className={styles.section}>
			{tasks.data.map((card: any) => (
				<BoardCard
					key={card.gid}
					gid={card.gid}
					title={card.name}
					text={card.notes}
					tags={card.tags}
				/>
			))}
		</section>
	);
};
