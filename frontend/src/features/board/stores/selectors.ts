import { RootState } from '../../../stores/store';
import { Task } from '../types/task';

export const sectionTasksSelector =
  (sectionGid: string) =>
  (state: RootState): Task[] =>
    state.tasks[sectionGid];
