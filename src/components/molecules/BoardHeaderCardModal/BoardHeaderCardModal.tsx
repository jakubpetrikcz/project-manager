import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setVisibility } from "../../../app/features/uiSlice";
import { useGetTagsQuery } from "../../../app/service/tagsApi";
import {
	useAddTagToTaskMutation,
	useDeleteTaskMutation,
	useRemoveTagFromTaskMutation,
	useUpdateTaskMutation,
} from "../../../app/service/tasksApi";
import { AppDispatch, RootState } from "../../../app/store";
import { TagType } from "../../../app/types";
import { Dropdown, IconButton, Tag } from "../../atoms";
import { PlusIcon } from "../../ui/icons";
import { DeleteWrapper,EditableText } from "..";

import styles from "./BoardHeaderCardModal.module.scss";

type BoardHeaderCardModalProps = {
	gid: string;
	name: string;
	tags: TagType[];
};

export const BoardHeaderCardModal = ({
	gid,
	name,
	tags,
}: BoardHeaderCardModalProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading, isError } = useGetTagsQuery();
	const [editableTitle, setEditableTitle] = useState(name);

	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	const [addTagToTask] = useAddTagToTaskMutation();
	const [removeTagFromTask] = useRemoveTagFromTaskMutation();

	const isSelecting = useSelector(
		(state: RootState) => state.ui.visibility[gid]
	);

	if (isLoading) return <div>Loding...</div>;
	if (isError) return <div>Error...</div>;

	const dropdownOptions = data?.data.map((tag) => ({
		id: tag.gid,
		value: tag.name,
	}));

	const handleSelectTag = (selectedId: string) => {
		dispatch(setVisibility({ id: gid, isVisible: false }));
		addTagToTask({ taskGid: gid, tagGid: selectedId });
	};

	const handleUpdateTitle = (title: string) => {
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

	return (
		<div className={styles.content}>
			<div className={styles.left}>
				<EditableText
					gid={`editTitle-${gid}`}
					text={editableTitle}
					setText={setEditableTitle}
					updateText={() => handleUpdateTitle(editableTitle)}
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
			) : !isSelecting ? (
				<IconButton
					icon={<PlusIcon />}
					onClick={() =>
						dispatch(setVisibility({ id: gid, isVisible: true }))
					}
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
