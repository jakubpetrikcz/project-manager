import { createApi } from '@reduxjs/toolkit/query/react';

import { PROJECT } from '../../constants';
import { ProjectResponse, ProjectsResponse } from '../types';

import { baseQueryWithReauth } from './baseQueryWithReauth';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [PROJECT],
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectsResponse, string>({
      query: (workspaceGid) =>
        `/projects?workspace=${workspaceGid}&opt_fields=color,name,icon`,
      providesTags: [PROJECT],
    }),
    getProject: builder.query<ProjectResponse, string>({
      query: (projectGid) => `/projects/${projectGid}`,
      providesTags: [PROJECT],
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectQuery } = projectsApi;
