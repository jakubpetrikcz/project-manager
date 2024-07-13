import { createApi } from '@reduxjs/toolkit/query/react';

import { ProjectResponse } from '../types';

import { baseQuery } from './baseQuery';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
	baseQuery: baseQuery(BASE_URL),
	tagTypes: ['Project'],
	endpoints: (builder) => ({
		getProjects: builder.query<ProjectResponse, void>({
			query: () => '/projects',
			providesTags: ['Project'],
		}),
	}),
});

export const { useGetProjectsQuery } = projectsApi;
