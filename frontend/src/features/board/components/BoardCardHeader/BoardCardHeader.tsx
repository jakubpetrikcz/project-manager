import {
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { VerticalDotsIcon } from '../../../../components/icons';
import {
	Button,
	ButtonEnum,
	IconButton,
	Options,
	Tag,
	TextInput,
} from '../../../../components/ui';
import { AppDispatch } from '../../../../stores/store';
import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
} from '../../api/tasksApi';
import { removeTask } from '../../stores/tasksSlice';
import { BoardCardType } from '../../types/card';

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
	const dispatch = useDispatch<AppDispatch>();
	const { id: projectGid } = useParams() as { id: string };
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
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

	const toggleMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsOptionsOpen((prevState) => !prevState);
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
								onChange={(
									event: ChangeEvent<HTMLInputElement>
								) => setEditableText(event.target.value)}
								ref={inputRef}
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
					{isOptionsOpen && (
						<Options setIsOptionsOpen={setIsOptionsOpen}>
							<Button
								text='Delete'
								variant={ButtonEnum.transparent}
								onClick={deleteItem}
							/>
						</Options>
					)}
				</div>
			</div>
		</>
	);
};
