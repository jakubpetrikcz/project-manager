import styles from "./BoardCardModal.module.scss";
import { BoardCardType } from "../../../types/card";
import { BadgeType, Tag } from "../../atoms";
import { EditableText } from "..";
import { useState } from "react";
import {
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} from "../../../app/service/tasksApi";

// Přidat přidávání attachmentů (obrázků)
export const BoardCardModal = ({ gid, title, text, tags }: BoardCardType) => {
	const [editableTitle, setEditableTitle] = useState(title);
	const [editableText, setEditableText] = useState(text);

	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	return (
		<div>
			<div className={styles.content}>
				<div className={styles.left}>
					<EditableText
						gid={`editTitle-${gid}`}
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
					gid={`editText-${gid}`}
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
