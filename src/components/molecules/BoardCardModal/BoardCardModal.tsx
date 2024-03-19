import styles from "./BoardCardModal.module.scss";
import { BoardCardType } from "../../../types/card";
import { BadgeType, Tag } from "../../atoms";
import { EditableText } from "..";
import { useState } from "react";
import {
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} from "../../../app/service/tasksApi";

export const BoardCardModal: React.FC<BoardCardType> = ({
	gid,
	title,
	text,
	tags,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isTextEditing, setIsTextEditing] = useState(false);
	const [editableTitle, setEditableTitle] = useState(title);
	const [editableText, setEditableText] = useState(text);

	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	return (
		<div>
			<div className={styles.content}>
				<div className={styles.left}>
					<EditableText
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						text={editableTitle}
						setText={setEditableTitle}
						updateText={() => {
							updateTask({
								gid,
								name: editableTitle,
							});
							if (!editableTitle) deleteTask(gid);
						}}
					>
						<h3 className={styles.title}>{editableTitle}</h3>
					</EditableText>
				</div>
				{tags.map((tag) => (
					<Tag
						key={tag.gid}
						text={tag.name}
						variant={tag.color as BadgeType}
					/>
				))}
			</div>
			<div className={styles.description}>
				<EditableText
					isEditing={isTextEditing}
					setIsEditing={setIsTextEditing}
					text={editableText}
					setText={setEditableText}
					updateText={() =>
						updateTask({
							gid,
							notes: editableText,
						})
					}
				>
					<p className={styles.text}>{editableText}</p>
				</EditableText>
			</div>
		</div>
	);
};
