import { useState, MouseEvent, useEffect, useRef, KeyboardEvent } from "react";

import styles from "./BoardCardHeader.module.scss";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
} from "../../../app/service/tasksApi";
import { Button, ButtonEnum, IconButton, Tag, TextInput } from "../../atoms";
import { VerticalDotsIcon } from "../../ui/icons";
import { OptionMenu } from "..";
import { removeTask } from "../../../app/features/tasksSlice";
import Skeleton from "react-loading-skeleton";
import { TagType } from "../../../app/types";

type BoardCardHeaderProps = {
	gid: string;
	imgSrc: string;
	sectionGid: string;
	name: string;
	tags: TagType[];
};

export const BoardCardHeader = ({
	gid,
	imgSrc,
	sectionGid,
	name,
	tags,
}: BoardCardHeaderProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [editableText, setEditableText] = useState("");
	const [isCreating, setIsCreating] = useState<boolean>(!gid);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isCreating) {
			inputRef.current?.focus();
		}
	}, [isCreating]);

	const [deleteTask, { isLoading: isDeleteLoading, isSuccess }] =
		useDeleteTaskMutation();
	const [createTask] = useCreateTaskMutation();

	if (isDeleteLoading) return <Skeleton />;

	if (isSuccess) return <div></div>;

	const openMenu = (event?: MouseEvent<HTMLButtonElement>) => {
		event?.stopPropagation();
		setIsMenuVisible(true);
	};

	const deleteItem = (event?: MouseEvent<HTMLButtonElement>) => {
		event?.stopPropagation();
		dispatch(removeTask({ sectionGid, gid }));
		deleteTask(gid);
	};

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

	return (
		<>
			{imgSrc && <img src={imgSrc} className={styles.backgroundImage} />}
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
			</div>
		</>
	);
};
