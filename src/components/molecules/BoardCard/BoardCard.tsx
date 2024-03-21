import { KeyboardEvent, MouseEvent, RefObject, useState } from "react";
import { BoardCardModal, ModalWindow, OptionMenu } from "..";
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
	useGetAttachmentsQuery,
} from "../../../app/service/tasksApi";
import { BoardCardType } from "../../../types/card";
import { removeLinks } from "../../../utils/removeLinks";
import {
	BadgeType,
	Button,
	ButtonEnum,
	IconButton,
	Tag,
	TextInput,
} from "../../atoms";
import { VerticalDotsIcon } from "../../icons";
import styles from "./BoardCard.module.scss";

type BoardCardProps = BoardCardType & {
	gid: string;
	inputRef?: RefObject<HTMLInputElement>;
	editableText?: string;
	setEditableText?: React.Dispatch<React.SetStateAction<string>>;
	setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BoardCard: React.FC<BoardCardProps> = ({
	title,
	text,
	tags,
	gid,
	inputRef,
	editableText,
	setEditableText,
	setIsCreating,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const {
		data: attachments,
		isLoading,
		isError,
	} = useGetAttachmentsQuery(gid, { skip: !title });
	const [deleteTask, { isLoading: isDeleteLoading, isSuccess }] =
		useDeleteTaskMutation();
	const [createTask, { isLoading: isCreateLoading }] =
		useCreateTaskMutation();

	if (isLoading || isDeleteLoading || isCreateLoading)
		return <div>Loading...</div>;

	if (isSuccess) return <div></div>;

	if (isError) return <div>Error</div>;

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setShowMenu(true);
	};

	const deleteItem = async (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		deleteTask(gid);
	};

	const description = removeLinks(text);

	const imgSrc = attachments?.data[0]?.download_url;

	const handleKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (editableText) {
				await createTask({ sectionGid: gid, name: editableText });
			}
			setIsCreating?.(false);
			setEditableText?.("");
		}
	};

	const handleBlur = () => {
		if (!editableText) {
			setIsCreating?.(false);
		} else {
			createTask({ sectionGid: gid, name: editableText });
			setIsCreating?.(false);
			setEditableText?.("");
		}
	};

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
							{inputRef ? (
								<TextInput
									value={editableText ?? ""}
									onChange={(event) =>
										setEditableText?.(event.target.value)
									}
									inputRef={inputRef}
									onKeyUp={(event) => handleKeyUp(event)}
									onBlur={handleBlur}
								/>
							) : (
								<h5>{title}</h5>
							)}
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
			{showModal && !inputRef && (
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
