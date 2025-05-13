import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { ASANA_BASE_URL } from '../../constants';
import { RootState } from '../store';

export const baseQuery = fetchBaseQuery({
	baseUrl: ASANA_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}

		return headers;
	},
});
