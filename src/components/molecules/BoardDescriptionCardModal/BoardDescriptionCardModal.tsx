import { useState } from "react";

import styles from "./BoardDescriptionCardModal.module.scss";
import { EditableText } from "..";
import { useUpdateTaskMutation } from "../../../app/service/tasksApi";

type BoardDescriptionCardModalProps = {
	gid: string;
	notes: string;
};

export const BoardDescriptionCardModal = ({
	gid,
	notes,
}: BoardDescriptionCardModalProps) => {
	const [editableText, setEditableText] = useState(notes);

	const [updateTask] = useUpdateTaskMutation();

	const handleUpdateText = (text: string) => {
		updateTask({
			gid,
			notes: text,
		});
	};
	return (
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
	);
};
