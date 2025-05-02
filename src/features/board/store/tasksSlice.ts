import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tasksApi } from '../api/tasksApi';
import { Task } from '../types/task';

type TasksState = {
	[sectionGid: string]: Task[];
};

const initialState: TasksState = {};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (
			state,
			action: PayloadAction<{ sectionGid: string; task: Task }>
		) => {
			const { sectionGid, task } = action.payload;
			state[sectionGid] = [...(state[sectionGid] || []), task];
		},
		removeTask: (
			state,
			action: PayloadAction<{ sectionGid: string; gid: string }>
		) => {
			const { sectionGid, gid } = action.payload;
			state[sectionGid] = state[sectionGid].filter(
				(task) => task.gid !== gid
			);
		},
		moveTask: (
			state,
			action: PayloadAction<{
				fromSectionGid: string;
				toSectionGid: string;
				taskGid: string;
			}>
		) => {
			const { fromSectionGid, toSectionGid, taskGid } = action.payload;
			const taskIndex = state[fromSectionGid].findIndex(
				(task) => task.gid === taskGid
			);
			if (taskIndex > -1) {
				const [task] = state[fromSectionGid].splice(taskIndex, 1);
				state[toSectionGid] = [...(state[toSectionGid] || []), task];
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
