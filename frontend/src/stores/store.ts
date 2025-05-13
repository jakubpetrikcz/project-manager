import { configureStore } from '@reduxjs/toolkit';

import { attachmentsApi } from '../features/board/api/attachmentsApi';
import { sectionsApi } from '../features/board/api/sectionsApi';
import { tasksApi } from '../features/board/api/tasksApi';
import { tasksSlice } from '../features/board/stores/tasksSlice';

import { authSlice } from './features/authSlice';
import { uiSlice } from './features/uiSlice';
import { authApi } from './service/authApi';
import { projectsApi } from './service/projectsApi';
import { tagsApi } from './service/tagsApi';
import { workspacesApi } from './service/workspacesApi';

const apis = {
	[tasksApi.reducerPath]: tasksApi.reducer,
	[sectionsApi.reducerPath]: sectionsApi.reducer,
	[tagsApi.reducerPath]: tagsApi.reducer,
	[attachmentsApi.reducerPath]: attachmentsApi.reducer,
	[projectsApi.reducerPath]: projectsApi.reducer,
	[workspacesApi.reducerPath]: workspacesApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
};

const slices = {
	[tasksSlice.name]: tasksSlice.reducer,
	[uiSlice.name]: uiSlice.reducer,
	[authSlice.name]: authSlice.reducer,
};

const middlewares = [
	tasksApi.middleware,
	sectionsApi.middleware,
	tagsApi.middleware,
	attachmentsApi.middleware,
	projectsApi.middleware,
	workspacesApi.middleware,
	authApi.middleware,
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
