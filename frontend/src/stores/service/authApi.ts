import { createApi } from '@reduxjs/toolkit/query/react';

import { LOCAL_SERVER } from '../../constants';
import { ProjectResponse } from '../types';

import { baseQueryWithReauth } from './baseQueryWithReauth';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getProfile: builder.query<ProjectResponse, void>({
			query: () => 'users/me',
		}),
		fetchToken: builder.mutation({
			query: (code: string) => ({
				url: `${LOCAL_SERVER}/auth/callback`,
				method: 'POST',
				body: { code },
				credentials: 'include',
			}),
		}),
	}),
});

export const { useGetProfileQuery, useFetchTokenMutation } = authApi;
