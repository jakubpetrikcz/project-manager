import { createApi } from '@reduxjs/toolkit/query/react';

import { WorkspaceResponse } from '../types';

import { baseQuery } from './baseQuery';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const workspacesApi = createApi({
	reducerPath: 'workspacesApi',
	baseQuery: baseQuery(BASE_URL),
	tagTypes: ['Workspace'],
	endpoints: (builder) => ({
		getWorkspaces: builder.query<WorkspaceResponse, void>({
			query: () => '/workspaces',
			providesTags: ['Workspace'],
		}),
	}),
});

export const { useGetWorkspacesQuery } = workspacesApi;
