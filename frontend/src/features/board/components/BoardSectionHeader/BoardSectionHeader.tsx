import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { HorizontalDotsIcon } from '../../../../components/icons';
import {
	Badge,
	Button,
	ButtonEnum,
	Card,
	EditableText,
	IconButton,
	Options,
} from '../../../../components/ui';
import { setEditMode } from '../../../../stores/features/uiSlice';
import { AppDispatch } from '../../../../stores/store';
import { useUpdateSectionMutation } from '../../api/sectionsApi';
import { useGetTasksQuery } from '../../api/tasksApi';
import { UNTITLED_SECTION } from '../../constants';

import styles from './BoardSectionHeader.module.scss';

type BoardSectionHeaderProps = {
	gid: string;
	title: string;
};

export const BoardSectionHeader = ({ gid, title }: BoardSectionHeaderProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data: tasks, isLoading, isError } = useGetTasksQuery(gid);
	const [updateSection] = useUpdateSectionMutation();
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !tasks) return <div>Error</div>;

	const handleUpdateSection = (text: string) => {
		updateSection({
			gid,
			name: text || UNTITLED_SECTION,
		});
	};

	const toggleMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsOptionsOpen((prevState) => !prevState);
	};

	const handleRenameClick = () => {
		dispatch(
			setEditMode({
				id: `editHeader-${gid}`,
				isEdit: true,
			})
		);
		setIsOptionsOpen(false);
	};

	return (
		<Card className={styles.card}>
			<div className={styles.left}>
				<EditableText
					gid={`editHeader-${gid}`}
					value={title}
					updateText={(text) => handleUpdateSection(text)}
					emptyText={UNTITLED_SECTION}
				>
					<span className={styles.text}>
						{title || UNTITLED_SECTION}
					</span>
				</EditableText>
				<Badge text={tasks.data.length.toString() || '0'} />
			</div>
			<div className={styles.right}>
				<IconButton
					icon={<HorizontalDotsIcon />}
					onClick={toggleMenu}
					className={styles.icon}
				/>
				{isOptionsOpen && (
					<Options setIsOptionsOpen={setIsOptionsOpen}>
						<Button
							text='Rename'
							variant={ButtonEnum.transparent}
							onClick={handleRenameClick}
						/>
					</Options>
				)}
			</div>
		</Card>
	);
};
