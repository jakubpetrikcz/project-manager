import { PayloadAction } from '@reduxjs/toolkit';

import { Section } from '../../../stores/types/section';
import { TagType } from '../../../stores/types/tag';

export type TaskResponse = {
  data: Task[];
};

export type CreateTaskResponse = {
  data: Task;
};

export type TaskTagArgs = {
  taskGid: string;
  tagGid: string;
};

export type TaskSectionArgs = {
  sectionGid: string;
  taskGid: string;
  insert_before: string | null;
};

export type CreateTaskArgs = {
  projectGid: string | null;
  sectionGid: string;
  name: string;
};

export type UpdateTaskArgs = {
  gid: string;
  name?: string;
  notes?: string;
};

export type DeleteTaskArgs = {
  taskGid: string;
};

export type Task = {
  gid: string;
  memberships: Membership[];
  name: string;
  notes: string;
  tags: TagType[];
};

type Membership = {
  section: Section[];
};

export type AddTaskAction = PayloadAction<{
  sectionGid: string;
  task: Task;
}>;

export type RemoveTaskAction = PayloadAction<{
  sectionGid: string;
  gid: string;
}>;

export type MoveTaskAction = PayloadAction<{
  fromSectionGid: string;
  toSectionGid: string;
  taskGid: string;
  before: string;
}>;
