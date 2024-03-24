import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../types/task";
import { tasksApi } from "../service/tasksApi";

type TasksState = {
	[sectionGid: string]: Task[];
};

const initialState: TasksState = {};

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (
			state,
			action: PayloadAction<{ sectionGid: string; task: Task }>
		) => {
			const { sectionGid, task } = action.payload;
			if (!state[sectionGid]) {
				state[sectionGid] = [task];
			} else {
				state[sectionGid].push(task);
			}
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

export const { addTask, removeTask } = tasksSlice.actions;
