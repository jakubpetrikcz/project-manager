import { createSlice } from '@reduxjs/toolkit';

import { tasksApi } from '../api/tasksApi';
import {
  AddTaskAction,
  MoveTaskAction,
  RemoveTaskAction,
  Task,
} from '../types/task';

type TasksState = {
  [sectionGid: string]: Task[];
};

const initialState: TasksState = {};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: AddTaskAction) => {
      const { sectionGid, task } = action.payload;
      state[sectionGid] = [...(state[sectionGid] || []), task];
    },
    removeTask: (state, action: RemoveTaskAction) => {
      const { sectionGid, gid } = action.payload;
      state[sectionGid] = state[sectionGid].filter((task) => task.gid !== gid);
    },
    moveTask: (state, action: MoveTaskAction) => {
      const { fromSectionGid, toSectionGid, taskGid, before } = action.payload;
      const taskIndex = state[fromSectionGid].findIndex(
        (task) => task.gid === taskGid
      );
      if (taskIndex > -1) {
        const [task] = state[fromSectionGid].splice(taskIndex, 1);
        if (before !== '-1') {
          const insertAtIndex = state[toSectionGid].findIndex(
            (task) => task.gid === before
          );
          if (insertAtIndex === undefined) return;

          state[toSectionGid].splice(insertAtIndex, 0, task);
        } else {
          state[toSectionGid].push(task);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tasksApi.endpoints.getTasks.matchFulfilled,
      (state, { payload, meta }) => {
        const sectionGid = meta.arg.originalArgs;
        if (sectionGid) {
          state[sectionGid] = payload.data;
        }
      }
    );
  },
});

export const { addTask, removeTask, moveTask } = tasksSlice.actions;
