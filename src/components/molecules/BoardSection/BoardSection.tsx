import { useEffect, useState } from "react";

import { useGetTasksQuery } from "../../../app/service/tasksApi";
import { BoardCard } from "../BoardCard";

import styles from "./BoardSection.module.scss";
import { Button } from "../../atoms";
import { PlusIcon } from "../../icons";
import { Task } from "../../../app/types/task";

type BoardSectionProps = {
	sectionGid: string;
};

export const BoardSection = ({ sectionGid }: BoardSectionProps) => {
	const { data: tasks, isLoading, isError } = useGetTasksQuery(sectionGid);
	const [tasksList, setTasksList] = useState<Task[]>([]);

	useEffect(() => {
		if (tasks) {
			setTasksList(tasks.data);
		}
	}, [tasks]);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !tasks) return <div>Error</div>;

	const handleCreate = () => {
		setTasksList((prev) => [
			...prev,
			{ gid: "", name: "", memberships: [], notes: "", tags: [] },
		]);
	};

	return (
		<section className={styles.section}>
			{tasksList.map((card) => (
				<BoardCard
					key={card.gid}
					gid={card.gid}
					sectionId={sectionGid}
					title={card.name}
					text={card.notes}
					tags={card.tags}
					setTasksList={setTasksList}
				/>
			))}
			<Button
				text="Add new"
				icon={<PlusIcon />}
				onClick={handleCreate}
				className={styles.createButton}
			/>
		</section>
	);
};
