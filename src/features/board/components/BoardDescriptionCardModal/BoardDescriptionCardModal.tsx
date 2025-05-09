import { useState } from 'react';

import { EditableText } from '../../../../components/ui';
import { useUpdateTaskMutation } from '../../api/tasksApi';

import styles from './BoardDescriptionCardModal.module.scss';

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
		setEditableText(text);
		updateTask({
			gid,
			notes: text,
		});
	};

	return (
		<div className={styles.description}>
			<span>
				<strong>Description</strong>
			</span>
			<EditableText
				gid={`editText-${gid}`}
				value={editableText}
				updateText={(text) => handleUpdateText(text)}
				className={styles.edit}
				textarea
			>
				<p className={styles.text}>{editableText}</p>
			</EditableText>
		</div>
	);
};
