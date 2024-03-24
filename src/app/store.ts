import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./service/tasksApi";
import { sectionsApi } from "./service/sectionsApi";
import { tasksSlice } from "./features/tasksSlice";
import { uiSlice } from "./features/uiSlice";

const store = configureStore({
	reducer: {
		[tasksApi.reducerPath]: tasksApi.reducer,
		[sectionsApi.reducerPath]: sectionsApi.reducer,
		[tasksSlice.name]: tasksSlice.reducer,
		[uiSlice.name]: uiSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			tasksApi.middleware,
			sectionsApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
