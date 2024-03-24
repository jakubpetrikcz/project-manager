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
export const BoardCardModal = ({ gid, name, notes, tags }: BoardCardType) => {
	const [editableTitle, setEditableTitle] = useState(name);
	const [editableText, setEditableText] = useState(notes);

	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	const handleUpdateText = (text: string) => {
		updateTask({
			gid,
			name: text,
		});
	};

	return (
		<div>
			<div className={styles.content}>
				<div className={styles.left}>
					<EditableText
						gid={`editTitle-${gid}`}
						text={editableTitle}
						setText={setEditableTitle}
						updateText={() => {
							handleUpdateText(editableText);
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
				<span>
					<strong>Popis</strong>
				</span>
				<EditableText
					gid={`editText-${gid}`}
					text={editableText}
					setText={setEditableText}
					updateText={() => handleUpdateText(editableText)}
					className={styles.edit}
					textarea
				>
					<p className={styles.text}>{editableText}</p>
				</EditableText>
			</div>
		</div>
	);
};
