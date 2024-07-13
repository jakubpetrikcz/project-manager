import { createApi } from '@reduxjs/toolkit/query/react';

import { ProjectResponse } from '../types';

import { baseQuery } from './baseQuery';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQuery(BASE_URL),
	endpoints: (builder) => ({
		getProfile: builder.query<ProjectResponse, void>({
			query: () => 'users/me',
		}),
	}),
});

export const { useGetProfileQuery } = authApi;
