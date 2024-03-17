import { BoardCardModal, ModalWindow } from "..";
import {
	useDeleteTaskMutation,
	useGetAttachmentsQuery,
} from "../../../app/service/tasks";
import { BoardCardType } from "../../../types/card";
import { BadgeType, Button, Tag } from "../../atoms";
import { ButtonEnum } from "../../atoms/Button/ButtonEnums";
import { VerticalDotsIcon } from "../../icons";
import { OptionMenu } from "../OptionMenu";
import styles from "./BoardCard.module.scss";
import { useState, MouseEvent } from "react";

type BoardCardProps = BoardCardType & {
	gid: string;
};

export const BoardCard: React.FC<BoardCardProps> = ({
	title,
	text,
	tags,
	gid,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const {
		data: attachments,
		isLoading,
		isError,
	} = useGetAttachmentsQuery(gid);
	const [deleteTask, { isLoading: isDeleteLoading, isSuccess }] =
		useDeleteTaskMutation();

	if (isLoading || isDeleteLoading) return <div>Loading...</div>;

	if (isSuccess) return <div></div>;

	if (isError || !attachments) return <div>Error</div>;

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setShowMenu(true);
	};

	const deleteItem = async (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		deleteTask(gid);
	};

	const linkRegex = /(https?\\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;

	const description = text.replace(linkRegex, ""); // TODO do utils funkce (removeLinks)

	const imgSrc = attachments.data[0]?.download_url;

	return (
		<>
			<div className={styles.card} onClick={() => setShowModal(true)}>
				{imgSrc && (
					<img src={imgSrc} className={styles.backgroundImage} />
				)}
				{tags.map((tag) => (
					<Tag
						key={tag.gid}
						text={tag.name}
						variant={tag.color as BadgeType}
					/>
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
					{showMenu && (
						<OptionMenu setShowMenu={setShowMenu}>
							<Button
								text="Odstranit"
								variant={ButtonEnum.transparent}
								onClick={(event) => event && deleteItem(event)}
							/>
						</OptionMenu>
					)}
				</div>
			</div>
			{showModal && (
				<ModalWindow
					close={() => setShowModal(false)}
					backgroundImage={imgSrc}
				>
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
