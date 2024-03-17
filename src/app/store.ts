import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./service/tasksApi";
import { sectionsApi } from "./service/sectionsApi";

const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		[sectionsApi.reducerPath]: sectionsApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			tasksApi.middleware,
			sectionsApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
