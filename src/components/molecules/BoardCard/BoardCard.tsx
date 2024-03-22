import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { BoardCardModal, ModalWindow, OptionMenu } from "..";
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
	useGetAttachmentsQuery,
} from "../../../app/service/tasksApi";
import { BoardCardType } from "../../../types/card";
import { removeLinks } from "../../../utils/removeLinks";
import { Button, ButtonEnum, IconButton, Tag, TextInput } from "../../atoms";
import { VerticalDotsIcon } from "../../icons";
import styles from "./BoardCard.module.scss";
import Skeleton from "react-loading-skeleton";
import { Task } from "../../../app/types/task";

type BoardCardProps = BoardCardType & {
	gid: string;
	sectionId: string;
	setTasksList?: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const BoardCard = ({
	title,
	text,
	tags,
	gid,
	sectionId,
	setTasksList,
}: BoardCardProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [editableText, setEditableText] = useState("");
	const [isCreating, setIsCreating] = useState<boolean>(!gid);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isCreating) {
			inputRef.current?.focus();
		}
	}, [isCreating]);

	const { data: attachments, isError } = useGetAttachmentsQuery(gid, {
		skip: !gid,
	});
	const [deleteTask, { isLoading: isDeleteLoading, isSuccess }] =
		useDeleteTaskMutation();
	const [createTask] = useCreateTaskMutation();

	if (isDeleteLoading) return <Skeleton />;

	if (isSuccess) return <div></div>;

	if (isError) return <div>Error</div>;

	const openMenu = (event?: MouseEvent<HTMLButtonElement>) => {
		event?.stopPropagation();
		setIsMenuVisible(true);
	};

	const deleteItem = (event?: MouseEvent<HTMLButtonElement>) => {
		event?.stopPropagation();
		setTasksList?.((prev) => prev.filter((task) => task.gid !== gid));
		deleteTask(gid);
	};

	const description = removeLinks(text);

	const imgSrc = attachments?.data[0]?.download_url;

	const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && editableText) {
			setIsCreating(false);
			createTask({
				sectionGid: sectionId,
				name: editableText,
			});
		}
	};

	const handleBlur = () => {
		if (!editableText) {
			setTasksList?.((prev) => prev.slice(0, -1));
		} else {
			createTask({ sectionGid: sectionId, name: editableText });
		}

		setIsCreating(false);
	};

	return (
		<>
			<div
				className={styles.card}
				onClick={() => setIsModalVisible(true)}
			>
				{imgSrc && (
					<img src={imgSrc} className={styles.backgroundImage} />
				)}
				{tags.map((tag) => (
					<Tag key={tag.gid} text={tag.name} variant={tag.color} />
				))}
				<div>
					<div className={styles.title}>
						<div className={styles.text}>
							{!title && isCreating ? (
								<TextInput
									value={editableText ?? ""}
									onChange={(event) =>
										setEditableText(event.target.value)
									}
									inputRef={inputRef}
									onKeyUp={(event) => handleKeyUp(event)}
									onBlur={handleBlur}
								/>
							) : (
								<h5>{title ? title : editableText}</h5>
							)}
						</div>
						<IconButton
							icon={<VerticalDotsIcon />}
							onClick={(event) => openMenu(event)}
							className={styles.icon}
						/>
						{isMenuVisible && (
							<OptionMenu setShowMenu={setIsMenuVisible}>
								<Button
									text="Odstranit"
									variant={ButtonEnum.transparent}
									onClick={(event) => deleteItem(event)}
								/>
							</OptionMenu>
						)}
					</div>
					{description && <p>{description}</p>}
				</div>
			</div>
			{isModalVisible && !inputRef && (
				<ModalWindow
					close={() => setIsModalVisible(false)}
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
