import { configureStore } from "@reduxjs/toolkit";

import { tasksSlice } from "./features/tasksSlice";
import { uiSlice } from "./features/uiSlice";
import { attachmentsApi } from "./service/attachmentsApi";
import { sectionsApi } from "./service/sectionsApi";
import { tagsApi } from "./service/tagsApi";
import { tasksApi } from "./service/tasksApi";

const apis = {
	[tasksApi.reducerPath]: tasksApi.reducer,
	[sectionsApi.reducerPath]: sectionsApi.reducer,
	[tagsApi.reducerPath]: tagsApi.reducer,
	[attachmentsApi.reducerPath]: attachmentsApi.reducer,
};

const slices = {
	[tasksSlice.name]: tasksSlice.reducer,
	[uiSlice.name]: uiSlice.reducer,
};

const middlewares = [
	tasksApi.middleware,
	sectionsApi.middleware,
	tagsApi.middleware,
	attachmentsApi.middleware,
];

export const store = configureStore({
	reducer: {
		...apis,
		...slices,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
