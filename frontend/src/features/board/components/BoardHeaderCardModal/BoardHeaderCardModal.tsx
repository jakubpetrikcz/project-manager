import { useMemo, useState } from 'react';

import { PlusIcon } from '../../../../components/icons';
import {
	DeleteWrapper,
	Dropdown,
	EditableText,
	IconButton,
	Tag,
} from '../../../../components/ui';
import { useGetTagsQuery } from '../../../../stores/service/tagsApi';
import { TagType } from '../../../../stores/types';
import {
	useAddTagToTaskMutation,
	useDeleteTaskMutation,
	useRemoveTagFromTaskMutation,
	useUpdateTaskMutation,
} from '../../api/tasksApi';
import { BoardCardType } from '../../types/card';

import styles from './BoardHeaderCardModal.module.scss';

type BoardHeaderCardModalProps = Pick<BoardCardType, 'gid' | 'name' | 'tags'>;

export const BoardHeaderCardModal = ({
	gid,
	name,
	tags,
}: BoardHeaderCardModalProps) => {
	const { data, isLoading, isError } = useGetTagsQuery();
	const [editableTitle, setEditableTitle] = useState(name);
	const [isSelectingTags, setIsSelectingTags] = useState(false);

	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	const [addTagToTask] = useAddTagToTaskMutation();
	const [removeTagFromTask] = useRemoveTagFromTaskMutation();

	const dropdownOptions = useMemo(
		() =>
			data?.data.map((tag) => ({
				id: tag.gid,
				value: tag.name,
			})),
		[data?.data]
	);

	const handleSelectTag = (selectedId: string) => {
		setIsSelectingTags(false);
		addTagToTask({ taskGid: gid, tagGid: selectedId });
	};

	const handleUpdateTitle = (title: string) => {
		setEditableTitle(title);
		updateTask({
			gid,
			name: title,
		});
		if (!title) deleteTask(gid);
	};

	const handleRemoveTagFromTask = (tag: TagType) => {
		removeTagFromTask({
			taskGid: gid,
			tagGid: tag.gid,
		});
	};

	if (isLoading) return <div>Loding...</div>;
	if (isError) return <div>Error...</div>;

	return (
		<div className={styles.content}>
			<div className={styles.text}>
				<EditableText
					gid={`editTitle-${gid}`}
					value={name}
					updateText={(text) => handleUpdateTitle(text)}
				>
					<h3 className={styles.title}>{editableTitle}</h3>
				</EditableText>
			</div>
			{tags.length > 0 ? (
				tags.map((tag) => (
					<DeleteWrapper
						key={tag.gid}
						element={<Tag text={tag.name} variant={tag.color} />}
						handleRemove={() => handleRemoveTagFromTask(tag)}
						showActionButton={!!tag}
					/>
				))
			) : !isSelectingTags ? (
				<IconButton
					icon={<PlusIcon />}
					onClick={() => setIsSelectingTags(true)}
				/>
			) : (
				<Dropdown
					options={dropdownOptions ? dropdownOptions : []}
					onSelect={handleSelectTag}
				/>
			)}
		</div>
	);
};
