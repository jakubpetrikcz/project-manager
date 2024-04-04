import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./service/tasksApi";
import { sectionsApi } from "./service/sectionsApi";
import { tasksSlice } from "./features/tasksSlice";
import { uiSlice } from "./features/uiSlice";
import { tagsApi } from "./service/tagsApi";

const apis = {
	[tasksApi.reducerPath]: tasksApi.reducer,
	[sectionsApi.reducerPath]: sectionsApi.reducer,
	[tagsApi.reducerPath]: tagsApi.reducer,
};

const slices = {
	[tasksSlice.name]: tasksSlice.reducer,
	[uiSlice.name]: uiSlice.reducer,
};

const middlewares = [
	tasksApi.middleware,
	sectionsApi.middleware,
	tagsApi.middleware,
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
