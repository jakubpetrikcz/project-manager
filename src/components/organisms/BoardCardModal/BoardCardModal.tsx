import styles from "./BoardCardModal.module.scss";
import { BoardCardType } from "../../../types/card";
import { Attachment } from "../../atoms";
import { ChangeEvent, useState } from "react";
import {
	useDeleteAttachmentMutation,
	useUpdateTaskMutation,
	useUploadAttachmentsMutation,
} from "../../../app/service/tasksApi";
import { BoardHeaderCardModal } from "../../molecules/BoardHeaderCardModal";
import { EditableText, RemovableComponent } from "../../molecules";

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
	const [uploadAttachments] = useUploadAttachmentsMutation();
	const [deleteAttachment] = useDeleteAttachmentMutation();
	const [editableText, setEditableText] = useState(notes);

	const [updateTask] = useUpdateTaskMutation();

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

	return (
		<>
			<BoardHeaderCardModal gid={gid} name={name} tags={tags} />
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
			<RemovableComponent
				element={<Attachment onChange={handleUpload} imgSrc={imgSrc} />}
				handleRemove={handleRemoveAttachment}
				showActionButton={!!imgSrc}
			/>
		</>
	);
};
