import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { ASANA_ACCESS_TOKEN_STORAGE_KEY } from '../../constants';

const getToken = () => localStorage.getItem(ASANA_ACCESS_TOKEN_STORAGE_KEY);

export const baseQuery = (baseUrl: string) =>
	fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			const token = getToken();
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}

			return headers;
		},
	});
