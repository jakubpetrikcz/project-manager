import { useState } from 'react';

import { EditableText } from '../../../../components/ui';
import { useUpdateTaskMutation } from '../../api/tasksApi';
import { BoardCardType } from '../../types/card';

import styles from './BoardDescriptionCardModal.module.scss';

type BoardDescriptionCardModalProps = Pick<BoardCardType, 'gid' | 'notes'>;

export const BoardDescriptionCardModal = ({
	gid,
	notes,
}: BoardDescriptionCardModalProps) => {
	const [updateTask] = useUpdateTaskMutation();
	const [editableText, setEditableText] = useState(notes);

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
