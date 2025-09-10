import { createApi } from '@reduxjs/toolkit/query/react';

import { WORKSPACE } from '../../constants';
import { WorkspaceResponse } from '../types';

import { baseQueryWithReauth } from './baseQueryWithReauth';

export const workspacesApi = createApi({
  reducerPath: 'workspacesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [WORKSPACE],
  endpoints: (builder) => ({
    getWorkspaces: builder.query<WorkspaceResponse, void>({
      query: () => '/workspaces',
      providesTags: [WORKSPACE],
    }),
  }),
});

export const { useGetWorkspacesQuery } = workspacesApi;
