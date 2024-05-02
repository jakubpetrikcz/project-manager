import { ChangeEvent } from "react";

import {
	useDeleteAttachmentMutation,
	useUploadAttachmentsMutation,
} from "../../../app/service/attachmentsApi";
import { BoardCardType } from "../../../types/card";
import { compressImg } from "../../../utils/compressImg";
import { Attachment } from "../../atoms";
import {
	BoardDescriptionCardModal,
	BoardHeaderCardModal,
	DeleteWrapper,
} from "../../molecules";

type BoardCardModalProps = BoardCardType & {
	attachmentGid?: string;
	sectionGid?: string;
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
			try {
				const compressedFile = await compressImg(event.target.files[0]);
				const formData = new FormData();
				formData.append("file", compressedFile, compressedFile.name);
				formData.append("parent", gid);
				await uploadAttachments({ taskGid: gid, file: formData });
				handleRemoveAttachment();
			} catch (error) {
				console.error("Error uploading the image:", error);
			}
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
