import { KeyboardEvent, MouseEvent, useEffect, useRef, useState, DragEvent } from "react";
import {  ModalWindow, OptionMenu } from "../../molecules";
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
	useGetAttachmentsQuery,
} from "../../../app/service/tasksApi";
import { BoardCardType } from "../../../types/card";
import { removeLinks } from "../../../utils/removeLinks";
import { Button, ButtonEnum, IconButton, Tag, TextInput } from "../../atoms";
import { VerticalDotsIcon } from "../../ui/icons";
import styles from "./BoardCard.module.scss";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { removeTask } from "../../../app/features/tasksSlice";
import { BoardCardModal } from "..";

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
	const dispatch = useDispatch<AppDispatch>();
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
		dispatch(removeTask({ sectionGid, gid }));
		deleteTask(gid);
	};

	const description = removeLinks(notes);

	const imgSrc = attachments?.data[attachments.data.length - 1]?.download_url;

	const handleKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && editableText) {
			setIsCreating(false);
			createTask({
				sectionGid: sectionGid,
				name: editableText,
			});
		}
	};

	const handleBlur = () => {
		if (!editableText) {
			dispatch(removeTask({ sectionGid, gid }));
		} else {
			createTask({ sectionGid, name: editableText });
		}

		setIsCreating(false);
	};

	const handleDragStart = (
		e: DragEvent<HTMLElement>,
		taskGid: string,
		sectionGid: string
	) => {
		e.dataTransfer.setData("text/plain", taskGid);
		e.dataTransfer.setData("sectionGid", sectionGid);
		e.dataTransfer.effectAllowed = "move";
	};

	// Vytvořit Card komponentu, která bude mít nějaké default styly (bílé pozadí, ...) -> dá se použít na SectionHeader, tady a dál
	return (
		<>
			<div
				className={styles.card}
				draggable
				onDragStart={(e) => handleDragStart(e, gid, sectionGid)}
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
							{!name && isCreating ? (
								<TextInput
									value={editableText}
									onChange={(event) =>
										setEditableText(event.target.value)
									}
									inputRef={inputRef}
									onKeyUp={(event) => handleKeyUp(event)}
									onBlur={handleBlur}
								/>
							) : (
								<h5>{name ? name : editableText}</h5>
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