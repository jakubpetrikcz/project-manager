import { DragEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, moveTask } from "../../../app/features/tasksSlice";
import { useAddTaskToSectionMutation } from "../../../app/service/tasksApi";
import { AppDispatch } from "../../../app/store";
import { Button, ButtonEnum } from "../../atoms";
import { BoardCard } from "../../organisms";
import { CirclePlusIcon } from "../../ui/icons";

import { makeSelectTasksBySection } from "./utils/selectors";

import styles from "./BoardSection.module.scss";

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
		<div
			className={styles.section}
			data-section-gid={sectionGid}
			onDragOver={(event) => event.preventDefault()}
			onDrop={handleOnDrop}
		>
			{sectionTasks.map((card) => (
				<BoardCard key={card.gid} sectionGid={sectionGid} {...card} />
			))}
			<Button
				text="Add new"
				icon={<CirclePlusIcon />}
				onClick={handleCreate}
				variant={ButtonEnum.secondary}
				className={styles.createButton}
			/>
		</div>
	);
};
