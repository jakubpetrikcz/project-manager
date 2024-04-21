import { ChangeEvent } from "react";
import imageCompression from "browser-image-compression";

import {
	useDeleteAttachmentMutation,
	useUploadAttachmentsMutation,
} from "../../../app/service/attachmentsApi";
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

			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 800,
				useWebWorker: true,
				fileType: "image/webp",
				initialQuality: 0.8,
			};

			try {
				const compressedFile = await imageCompression(file, options);

				const formData = new FormData();
				formData.append(
					"file",
					compressedFile,
					file.name.replace(/\.\w+$/, ".webp")
				);
				formData.append("parent", gid);

				await uploadAttachments({
					taskGid: gid,
					file: formData,
				});

				handleRemoveAttachment();
			} catch (error) {
				console.error("Chyba při kompresi obrázku:", error);
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
