import styles from "./BoardCardModal.module.scss";
import { BoardCardType } from "../../../types/card";
import { Attachment, IconButton, Tag } from "../../atoms";
import { EditableText } from "..";
import { ChangeEvent, useState } from "react";
import {
	useDeleteAttachmentMutation,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
	useUploadAttachmentsMutation,
} from "../../../app/service/tasksApi";
import { CloseIcon } from "../../icons";

type BoardCardModalProps = BoardCardType & {
	attachmentGid?: string;
};

// Přidat přidávání attachmentů (obrázků)
export const BoardCardModal = ({
	gid,
	name,
	notes,
	tags,
	imgSrc,
	attachmentGid,
}: BoardCardModalProps) => {
	const [uploadAttachments] = useUploadAttachmentsMutation();
	const [deleteAttachment] = useDeleteAttachmentMutation();
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
							handleUpdateText(editableText);
							if (!editableTitle) deleteTask(gid);
						}}
					>
						<h3 className={styles.title}>{editableTitle}</h3>
					</EditableText>
				</div>
				{tags.map((tag) => (
					<Tag key={tag.gid} text={tag.name} variant={tag.color} />
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
			<div className={styles.attachmentContainer}>
				<Attachment onChange={handleUpload} imgSrc={imgSrc} />
				<IconButton
					className={styles.close}
					icon={<CloseIcon color="black" />}
					onClick={handleRemoveAttachment}
				/>
			</div>
		</div>
	);
};
