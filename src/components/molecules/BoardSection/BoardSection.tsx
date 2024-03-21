import React, { useEffect, useRef, useState } from "react";

import {
	useCreateTaskMutation,
	useGetTasksQuery,
} from "../../../app/service/tasksApi";
import { BoardCard } from "../BoardCard";

import styles from "./BoardSection.module.scss";
import { Button } from "../../atoms";
import { PlusIcon } from "../../icons";

type BoardSectionProps = {
	gid?: string;
};

export const BoardSection: React.FC<BoardSectionProps> = ({ gid }) => {
	const { data: tasks, isLoading, isError } = useGetTasksQuery(gid);
	const [isCreating, setIsCreating] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [editableText, setEditableText] = useState("");

	const handleCreate = () => {
		setIsCreating(true);
	};

	useEffect(() => {
		if (isCreating) {
			inputRef.current?.focus();
		}
	}, [isCreating]);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !tasks) return <div>Error</div>;

	return (
		<section className={styles.section}>
			{tasks.data.map((card) => (
				<BoardCard
					key={card.gid}
					gid={card.gid}
					title={card.name}
					text={card.notes}
					tags={card.tags}
				/>
			))}
			{isCreating && gid && (
				<BoardCard
					gid={gid}
					title={""}
					text={""}
					tags={[]}
					editableText={editableText}
					setEditableText={setEditableText}
					inputRef={inputRef}
					setIsCreating={setIsCreating}
				/>
			)}
			<Button
				text="Add new"
				icon={<PlusIcon />}
				onClick={handleCreate}
				className={styles.createButton}
			/>
		</section>
	);
};
