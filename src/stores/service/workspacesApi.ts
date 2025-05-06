import { createApi } from '@reduxjs/toolkit/query/react';

import { WORKSPACE } from '../../constants';
import { WorkspaceResponse } from '../types';

import { baseQuery } from './baseQuery';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const workspacesApi = createApi({
	reducerPath: 'workspacesApi',
	baseQuery: baseQuery(BASE_URL),
	tagTypes: [WORKSPACE],
	endpoints: (builder) => ({
		getWorkspaces: builder.query<WorkspaceResponse, void>({
			query: () => '/workspaces',
			providesTags: [WORKSPACE],
		}),
	}),
});

export const { useGetWorkspacesQuery } = workspacesApi;
