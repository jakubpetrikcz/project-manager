import { BoardCardModal, ModalWindow } from "..";
import { useGetAttachmentsQuery } from "../../../app/service/tasks";
import { BoardCardType } from "../../../types/card";
import { BadgeType, Button, Tag } from "../../atoms";
import { VerticalDotsIcon } from "../../icons";
import styles from "./BoardCard.module.scss";
import { MouseEvent, useState } from "react";

type BoardCardProps = BoardCardType & {
	gid: string;
}

export const BoardCard: React.FC<BoardCardProps> = ({ title, text, tags, gid }) => {
	const [showModal, setShowModal] = useState(false);
	const { data: attachments, isLoading, isError } = useGetAttachmentsQuery(gid);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !attachments) return <div>Error</div>;

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		console.log("ahoj");
	};

	const linkRegex = /(https?\\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g; 

	const description = text.replace(linkRegex, ""); // TODO do utils funkce (removeLinks)

	const imgSrc = attachments.data[0]?.download_url;

	console.log(tags);

	return (
		<>
			<div className={styles.card} onClick={() => setShowModal(true)}>
				{imgSrc && (
					<img
						src={imgSrc}
						className={styles.backgroundImage}
					/>
				)}
				{tags.map((tag) => (
					<Tag key={tag.gid} text={tag.name} variant={tag.color as BadgeType} />
				))}
				<div className={styles.description}>
					<div className={styles.text}>
						<h5>{title}</h5>
						<p>{description}</p>
					</div>
					<Button
						icon={<VerticalDotsIcon />}
						onClick={(event) => event && openMenu(event)}
						className={styles.icon}
					/>
				</div>
			</div>
			{showModal && (
				<ModalWindow close={() => setShowModal(false)} backgroundImage={imgSrc}>
					<BoardCardModal
						title={title}
						text={description}
						tags={tags}
					/>
				</ModalWindow>
			)}
		</>
	);
};
