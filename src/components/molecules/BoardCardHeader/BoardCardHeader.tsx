import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeTask } from '../../../app/features/tasksSlice';
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
} from '../../../app/service/tasksApi';
import { AppDispatch } from '../../../app/store';
import { PROJECT_GID_STORAGE_KEY } from '../../../constants';
import { BoardCardType } from '../../../types/card';
import { Button, ButtonEnum, IconButton, Tag, TextInput } from '../../atoms';
import { VerticalDotsIcon } from '../../ui/icons';
import { OptionMenu } from '..';

import styles from './BoardCardHeader.module.scss';

type BoardCardHeaderProps = Omit<BoardCardType, 'notes'> & {
	sectionGid: string;
};

export const BoardCardHeader = ({
	gid,
	imgSrc,
	sectionGid,
	name,
	tags,
}: BoardCardHeaderProps) => {
	const projectGid = localStorage.getItem(PROJECT_GID_STORAGE_KEY);
	const dispatch = useDispatch<AppDispatch>();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [editableText, setEditableText] = useState('');
	const [isCreating, setIsCreating] = useState<boolean>(!gid);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isCreating) {
			inputRef.current?.focus();
		}
	}, [isCreating]);

	const [deleteTask] = useDeleteTaskMutation();
	const [createTask] = useCreateTaskMutation();

	const toggleMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsMenuVisible((prevState) => !prevState);
	};

	const deleteItem = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		dispatch(removeTask({ sectionGid, gid }));
		deleteTask(gid);
	};

	const handleKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && editableText) {
			setIsCreating(false);
			createTask({
				projectGid,
				sectionGid,
				name: editableText,
			});
		}
	};

	const handleBlur = () => {
		if (!editableText) {
			dispatch(removeTask({ sectionGid, gid }));
		} else {
			createTask({ projectGid, sectionGid, name: editableText });
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
						onClick={toggleMenu}
						className={styles.icon}
					/>
					{isMenuVisible && (
						<OptionMenu setShowMenu={setIsMenuVisible}>
							<Button
								text='Odstranit'
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
