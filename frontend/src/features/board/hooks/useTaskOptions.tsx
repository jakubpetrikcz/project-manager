import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../../components/ui';
import { AppDispatch } from '../../../stores/store';
import { useDeleteTaskMutation } from '../api/tasksApi';
import { removeTask } from '../stores/tasksSlice';

export const useTaskOptions = (sectionGid: string, gid: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteTask] = useDeleteTaskMutation();

  const deleteItem = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(removeTask({ sectionGid, gid }));
    deleteTask({ taskGid: gid });
  };

  const renderOptions = () => (
    <Button text='Delete' variant='transparent' onClick={deleteItem} />
  );

  return renderOptions;
};
