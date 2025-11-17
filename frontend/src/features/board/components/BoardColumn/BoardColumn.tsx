import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { CirclePlusIcon } from '../../../../components/icons';
import { Button, DropIndicator } from '../../../../components/ui';
import { AppDispatch } from '../../../../stores/store';
import { useGetTasksQuery } from '../../api/tasksApi';
import { useColumnDragAndDrop } from '../../hooks/useColumnDragAndDrop';
import { sectionTasksSelector } from '../../stores/selectors';
import { addTask } from '../../stores/tasksSlice';
import { BoardCard } from '../BoardCard';
import { BoardCardSkeleton } from '../BoardCard/BoardCardSkeleton';
import {
  BoardColumnHeader,
  BoardColumnHeaderSkeleton,
} from '../BoardColumnHeader';

import styles from './BoardColumn.module.scss';

type BoardColumnProps = {
  sectionGid: string;
  title: string;
};

export const BoardColumn = memo(({ sectionGid, title }: BoardColumnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const sectionTasks = useSelector(sectionTasksSelector(sectionGid));
  const { isLoading } = useGetTasksQuery(sectionGid);

  const handleCreate = useCallback(() => {
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
  }, [dispatch, sectionGid]);

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
      {isLoading ? (
        <BoardColumnHeaderSkeleton />
      ) : (
        <BoardColumnHeader gid={sectionGid} title={title} />
      )}
      <div className={styles.container}>
        {isLoading ? (
          <BoardCardSkeleton cards={2} />
        ) : (
          sectionTasks.map((card) => (
            <BoardCard key={card.gid} sectionGid={sectionGid} {...card} />
          ))
        )}
        <DropIndicator beforeId={null} column={sectionGid} />
        <Button
          text='Add new'
          icon={<CirclePlusIcon />}
          onClick={handleCreate}
          variant='secondary'
          className={styles.createButton}
        />
      </div>
    </div>
  );
});
