import styles from "./Board.module.scss";
import { boardHeaders } from "../../../constants/cardsArray";
import { BoardCard, BoardHeaderCard } from "../../molecules";
import { useGetTasksQuery } from "../../../app/service/tasks";

export const Board = () => {
	const { data: tasks, isLoading, isError } = useGetTasksQuery();

	if (isLoading) return <div>Loading...</div>;

	if (isError || !tasks) return <div>Error</div>;

	console.log(tasks);

	return (
		<div className={styles.board}>
			<div className={styles.header}>
				{boardHeaders.map((header) => (
					<BoardHeaderCard key={header.title} {...header} />
				))}
			</div>
			<div className={styles.content}>
				{tasks.data.map((card) => (
					<BoardCard
						key={card.gid}
						gid={card.gid}
						title={card.name}
						text={card.notes}
						tags={card.tags}
					/>
				))}
			</div>
		</div>
	);
};
