import styles from "./BoardCardModal.module.scss";
import { BoardCardType } from "../../../types/card";
import { Attachment, Dropdown, IconButton, Tag } from "../../atoms";
import { EditableText } from "..";
import { ChangeEvent, useState } from "react";
import {
	useAddTagToTaskMutation,
	useDeleteAttachmentMutation,
	useDeleteTaskMutation,
	useRemoveTagFromTaskMutation,
	useUpdateTaskMutation,
	useUploadAttachmentsMutation,
} from "../../../app/service/tasksApi";
import { CloseIcon, PlusIcon } from "../../icons";
import { useGetTagsQuery } from "../../../app/service/tagsApi";

type BoardCardModalProps = BoardCardType & {
	attachmentGid?: string;
};

export const BoardCardModal = ({
	gid,
	name,
	notes,
	tags,
	imgSrc,
	attachmentGid,
}: BoardCardModalProps) => {
	const { data, isLoading, isError } = useGetTagsQuery();
	const [uploadAttachments] = useUploadAttachmentsMutation();
	const [deleteAttachment] = useDeleteAttachmentMutation();
	const [addTagToTask] = useAddTagToTaskMutation();
	const [removeTagFromTask] = useRemoveTagFromTaskMutation();
	const [editableTitle, setEditableTitle] = useState(name);
	const [editableText, setEditableText] = useState(notes);
	const [isOpen, setIsOpen] = useState(false);

	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	// if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	console.log("tags", data);

	const dropdownOptions = data?.data.map((tag) => ({
		id: tag.gid,
		value: tag.name,
	}));

	const handleUpdateTitle = (title: string) => {
		updateTask({
			gid,
			name: title,
		});
	};

	const handleUpdateText = (text: string) => {
		updateTask({
			gid,
			notes: text,
		});
	};

	const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const reader = new FileReader();

			reader.onloadend = async () => {
				const base64Data = reader.result as string;
				const base64Content = base64Data.split(",")[1];

				const base64Response = await fetch(
					`data:${file.type};base64,${base64Content}`
				);
				const blob = await base64Response.blob();

				const formData = new FormData();
				formData.append("file", blob, file.name);
				formData.append("parent", gid);

				await uploadAttachments({
					taskGid: gid,
					file: formData,
				});

				handleRemoveAttachment();
			};

			reader.readAsDataURL(file);
		}
	};

	const handleRemoveAttachment = () => {
		if (attachmentGid) {
			deleteAttachment(attachmentGid);
		}
	};

	// TODO: Refaktorovat JSX hlavně divy
	return (
		<div>
			<div className={styles.content}>
				<div className={styles.left}>
					<EditableText
						gid={`editTitle-${gid}`}
						text={editableTitle}
						setText={setEditableTitle}
						updateText={() => {
							handleUpdateTitle(editableTitle);
							if (!editableTitle) deleteTask(gid);
						}}
					>
						<h3 className={styles.title}>{editableTitle}</h3>
					</EditableText>
				</div>
				{tags.length > 0 ? (
					tags.map((tag) => (
						// TODO: udělat komponentu z tagContainer, protože to stejné je i v TagsPage
						<div key={tag.gid} className={styles.tagContainer}>
							<IconButton
								className={styles.close}
								icon={<CloseIcon color="black" />}
								onClick={() =>
									removeTagFromTask({
										taskGid: gid,
										tagGid: tag.gid,
									})
								}
							/>
							<Tag text={tag.name} variant={tag.color} />
						</div>
					))
				) : !isOpen ? (
					<IconButton
						icon={<PlusIcon />}
						onClick={() => setIsOpen(true)}
					/>
				) : (
					<Dropdown
						options={dropdownOptions ? dropdownOptions : []}
						onSelect={(selectedId) => {
							setIsOpen(false);
							addTagToTask({ taskGid: gid, tagGid: selectedId });
						}}
					/>
				)}
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
			<div className={styles.attachmentContainer}>
				<Attachment onChange={handleUpload} imgSrc={imgSrc} />
				{imgSrc && (
					<IconButton
						className={styles.close}
						icon={<CloseIcon color="black" />}
						onClick={handleRemoveAttachment}
					/>
				)}
			</div>
		</div>
	);
};
