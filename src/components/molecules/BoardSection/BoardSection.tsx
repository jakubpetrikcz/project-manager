import { useGetTasksQuery } from "../../../app/service/tasksApi";
import { BoardCard } from "../BoardCard";

import styles from "./BoardSection.module.scss";
import { Button } from "../../atoms";
import { CirclePlusIcon } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { addTask } from "../../../app/features/tasksSlice";
import { createSelector } from "reselect";

type BoardSectionProps = {
	sectionGid: string;
};

const selectTasksBySection = createSelector(
	[
		(state: RootState, sectionGid: string) => state.tasks[sectionGid] || [],
		(sectionGid) => sectionGid,
	],
	(tasks) => tasks
);

export const BoardSection = ({ sectionGid }: BoardSectionProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const sectionTasks = useSelector((state: RootState) =>
		selectTasksBySection(state, sectionGid)
	);

	// console.log(sectionTasks);

	const { data: tasks, isLoading, isError } = useGetTasksQuery(sectionGid);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !tasks) return <div>Error</div>;

	const handleCreate = () => {
		const newTask = {
			gid: "",
			name: "",
			memberships: [{ section: [{ gid: sectionGid, name: "" }] }],
			notes: "",
			tags: [],
		};

		dispatch(
			addTask({
				sectionGid,
				task: newTask,
			})
		);
	};

	return (
		<section className={styles.section}>
			{sectionTasks.map((card) => (
				<BoardCard key={card.gid} sectionGid={sectionGid} {...card} />
			))}
			<Button
				text="Add new"
				icon={<CirclePlusIcon />}
				onClick={handleCreate}
				className={styles.createButton}
			/>
		</section>
	);
};
