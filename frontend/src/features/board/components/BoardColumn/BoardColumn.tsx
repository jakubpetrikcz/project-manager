import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { CirclePlusIcon } from '../../../../components/icons';
import { Button, ButtonEnum, DropIndicator } from '../../../../components/ui';
import { AppDispatch } from '../../../../stores/store';
import { useColumnDragAndDrop } from '../../hooks/useColumnDragAndDrop';
import { sectionTasksSelector } from '../../stores/selectors';
import { addTask } from '../../stores/tasksSlice';
import { BoardCard } from '../BoardCard';
import { BoardColumnHeader } from '../BoardColumnHeader';

import styles from './BoardColumn.module.scss';

type BoardColumnProps = {
	sectionGid: string;
	title: string;
};

export const BoardColumn = ({ sectionGid, title }: BoardColumnProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const sectionTasks = useSelector(sectionTasksSelector(sectionGid));

	const handleCreate = () => {
		const newTask = {
			gid: '',
			name: '',
			memberships: [{ section: [{ gid: sectionGid, name: '' }] }],
			notes: '',
			tags: [],
		};

		dispatch(
			addTask({
				sectionGid,
				task: newTask,
			})
		);
	};

	const { isDraggingOver, handleDragOver, handleDragEnd, handleDragLeave } =
		useColumnDragAndDrop(sectionGid);

	return (
		<div
			className={classNames(styles.column, {
				[styles.active]: isDraggingOver,
			})}
			data-section-gid={sectionGid}
			onDragOver={handleDragOver}
			onDrop={handleDragEnd}
			onDragLeave={handleDragLeave}
		>
			<BoardColumnHeader gid={sectionGid} title={title} />
			<div className={styles.container}>
				{sectionTasks?.map((card) => (
					<BoardCard
						key={card.gid}
						sectionGid={sectionGid}
						{...card}
					/>
				))}
				<DropIndicator beforeId={null} column={sectionGid} />
				<Button
					text='Add new'
					icon={<CirclePlusIcon />}
					onClick={handleCreate}
					variant={ButtonEnum.secondary}
					className={styles.createButton}
				/>
			</div>
		</div>
	);
};
