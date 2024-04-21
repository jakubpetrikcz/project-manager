import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";

import { removeTask } from "../../../app/features/tasksSlice";
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
} from "../../../app/service/tasksApi";
import { AppDispatch } from "../../../app/store";
import { BoardCardType } from "../../../types/card";
import { Button, ButtonEnum, IconButton, Tag, TextInput } from "../../atoms";
import { VerticalDotsIcon } from "../../ui/icons";
import { OptionMenu } from "..";

import styles from "./BoardCardHeader.module.scss";

type BoardCardHeaderProps = Omit<BoardCardType, "notes"> & {
	sectionGid: string;
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

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsMenuVisible(true);
	};

	const deleteItem = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
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
			{imgSrc && (
				<img
					src={imgSrc}
					className={styles.backgroundImage}
					alt={name}
				/>
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
								onKeyUp={handleKeyUp}
								onBlur={handleBlur}
							/>
						) : (
							<h5>{name ? name : editableText}</h5>
						)}
					</div>
					<IconButton
						icon={<VerticalDotsIcon />}
						onClick={openMenu}
						className={styles.icon}
					/>
					{isMenuVisible && (
						<OptionMenu setShowMenu={setIsMenuVisible}>
							<Button
								text="Odstranit"
								variant={ButtonEnum.transparent}
								onClick={deleteItem}
							/>
						</OptionMenu>
					)}
				</div>
			</div>
		</>
	);
};
