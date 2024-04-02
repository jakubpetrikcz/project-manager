import { DragEvent, useMemo } from "react";
import {
	useAddTaskToSectionMutation,
	useGetTasksQuery,
} from "../../../app/service/tasksApi";
import { BoardCard } from "../../organisms/BoardCard";

import styles from "./BoardSection.module.scss";
import { Button } from "../../atoms";
import { CirclePlusIcon } from "../../ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { addTask, moveTask } from "../../../app/features/tasksSlice";
import { makeSelectTasksBySection } from "./utils/selectors";

type BoardSectionProps = {
	sectionGid: string;
};

export const BoardSection = ({ sectionGid }: BoardSectionProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const selectTasksBySection = useMemo(makeSelectTasksBySection, []);
	const sectionTasks = useSelector((state) =>
		selectTasksBySection(state, sectionGid)
	);
	const [moveTaskToSection] = useAddTaskToSectionMutation();

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

	const handleOnDrop = async (event: DragEvent<HTMLElement>) => {
		event.preventDefault();
		const taskGid = event.dataTransfer.getData("text/plain");
		const targetSectionGid =
			event.currentTarget.getAttribute("data-section-gid");
		const oldSectionGid = event.dataTransfer.getData("sectionGid");

		if (
			targetSectionGid &&
			oldSectionGid &&
			targetSectionGid !== oldSectionGid
		) {
			try {
				dispatch(
					moveTask({
						fromSectionGid: oldSectionGid,
						toSectionGid: targetSectionGid,
						taskGid,
					})
				);
				await moveTaskToSection({
					sectionGid: targetSectionGid,
					taskGid,
				}).unwrap();
			} catch (error) {
				console.error("Error moving task to section:", error);
			}
		}
	};

	return (
		<section
			className={styles.section}
			data-section-gid={sectionGid}
			onDragOver={(e) => e.preventDefault()}
			onDrop={handleOnDrop}
		>
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
