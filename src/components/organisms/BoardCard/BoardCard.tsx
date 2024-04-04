import { DragEvent,useState } from "react";

import { useGetAttachmentsQuery } from "../../../app/service/tasksApi";
import { BoardCardType } from "../../../types/card";
import { removeLinks } from "../../../utils/removeLinks";
import { Card } from "../../atoms";
import { BoardCardHeader, ModalWindow } from "../../molecules";
import { BoardCardModal } from "..";

import styles from "./BoardCard.module.scss";

type BoardCardProps = BoardCardType & {
	sectionGid: string;
};

export const BoardCard = ({
	name,
	notes,
	tags,
	gid,
	sectionGid,
}: BoardCardProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { data: attachments, isError } = useGetAttachmentsQuery(gid, {
		skip: !gid,
	});

	if (isError) return <div>Error</div>;

	const description = removeLinks(notes);

	const imgSrc = attachments?.data[attachments.data.length - 1]?.download_url;

	const handleDragStart = (
		event: DragEvent<HTMLElement>,
		taskGid: string,
		sectionGid: string
	) => {
		event.dataTransfer.setData("text/plain", taskGid);
		event.dataTransfer.setData("sectionGid", sectionGid);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<>
			<Card
				className={styles.card}
				draggable
				onDragStart={(event) => handleDragStart(event, gid, sectionGid)}
				onClick={() => setIsModalVisible(true)}
			>
				<BoardCardHeader
					gid={gid}
					imgSrc={imgSrc ?? ""}
					sectionGid={sectionGid}
					name={name}
					tags={tags}
				/>
				{description && <p>{description}</p>}
			</Card>
			{isModalVisible && (
				<ModalWindow
					close={() => setIsModalVisible(false)}
					backgroundImage={imgSrc}
				>
					<BoardCardModal
						gid={gid}
						attachmentGid={attachments?.data[0]?.gid}
						name={name}
						notes={description}
						tags={tags}
						imgSrc={imgSrc}
					/>
				</ModalWindow>
			)}
		</>
	);
};
