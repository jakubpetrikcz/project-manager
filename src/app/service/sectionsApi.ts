import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Section, SectionResponse } from "../types/task";

const baseUrl = import.meta.env.VITE_ASANA_BASE_URL;
const projectGid = import.meta.env.VITE_ASANA_PROJECT_GID;

export const sectionsApi = createApi({
	reducerPath: "sectionsApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			const token = import.meta.env.VITE_ASANA_TOKEN;

			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ["Section"],
	endpoints: (builder) => ({
		getSections: builder.query<SectionResponse, void>({
			query: () => `/projects/${projectGid}/sections?opt_fields=name`,
			providesTags: ["Section"],
		}),
		updateSection: builder.mutation<void, Section>({
			query: ({ gid, name }) => ({
				url: `/sections/${gid}`,
				method: "PUT",
				body: JSON.stringify({ data: { name } }),
			}),
			invalidatesTags: ["Section"],
		}),
	}),
});

export const { useGetSectionsQuery, useUpdateSectionMutation } = sectionsApi;
