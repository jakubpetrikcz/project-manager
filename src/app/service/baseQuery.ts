import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const TOKEN = import.meta.env.VITE_ASANA_TOKEN;

export const baseQuery = (baseUrl: string) =>
	fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			if (TOKEN) {
				headers.set("authorization", `Bearer ${TOKEN}`);
			}

			return headers;
		},
	});
