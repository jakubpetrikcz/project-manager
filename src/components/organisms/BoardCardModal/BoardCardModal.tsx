import { ChangeEvent } from "react";

import {
	useDeleteAttachmentMutation,
	useUploadAttachmentsMutation,
} from "../../../app/service/tasksApi";
import { BoardCardType } from "../../../types/card";
import { Attachment } from "../../atoms";
import {
	BoardDescriptionCardModal,
	BoardHeaderCardModal,
	DeleteWrapper,
} from "../../molecules";

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
			<BoardDescriptionCardModal gid={gid} notes={notes} />
			<DeleteWrapper
				element={<Attachment onChange={handleUpload} imgSrc={imgSrc} />}
				handleRemove={handleRemoveAttachment}
				showActionButton={!!imgSrc}
			/>
		</>
	);
};
