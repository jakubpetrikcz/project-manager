import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./service/tasks";

const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
