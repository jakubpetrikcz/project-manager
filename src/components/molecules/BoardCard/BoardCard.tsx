import { BoardCardModal, ModalWindow, OptionMenu } from "..";
import {
	useDeleteTaskMutation,
	useGetAttachmentsQuery,
} from "../../../app/service/tasksApi";
import { BoardCardType } from "../../../types/card";
import { removeLinks } from "../../../utils/removeLinks";
import { BadgeType, Button, ButtonEnum, IconButton, Tag } from "../../atoms";
import { VerticalDotsIcon } from "../../icons";
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

	const description = removeLinks(text);

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
				<div>
					<div className={styles.title}>
						<div className={styles.text}>
							<h5>{title}</h5>
						</div>
						<IconButton
							icon={<VerticalDotsIcon />}
							onClick={(event) => event && openMenu(event)}
							className={styles.icon}
						/>
						{showMenu && (
							<OptionMenu setShowMenu={setShowMenu}>
								<Button
									text="Odstranit"
									variant={ButtonEnum.transparent}
									onClick={(event) =>
										event && deleteItem(event)
									}
								/>
							</OptionMenu>
						)}
					</div>
					{description && <p>{description}</p>}
				</div>
			</div>
			{showModal && (
				<ModalWindow
					close={() => setShowModal(false)}
					backgroundImage={imgSrc}
				>
					<BoardCardModal
						gid={gid}
						title={title}
						text={description}
						tags={tags}
					/>
				</ModalWindow>
			)}
		</>
	);
};
