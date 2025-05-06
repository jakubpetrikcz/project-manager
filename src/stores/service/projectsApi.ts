import { createApi } from '@reduxjs/toolkit/query/react';

import { PROJECT } from '../../constants';
import { ProjectResponse, ProjectsResponse } from '../types';

import { baseQuery } from './baseQuery';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
	baseQuery: baseQuery(BASE_URL),
	tagTypes: [PROJECT],
	endpoints: (builder) => ({
		getProjects: builder.query<ProjectsResponse, string | undefined>({
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
