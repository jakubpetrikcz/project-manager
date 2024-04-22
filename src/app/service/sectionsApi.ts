import { createApi } from "@reduxjs/toolkit/query/react";

import { Section, SectionResponse } from "../types";

import { baseQuery } from "./baseQuery";

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;
const PROJECT_GID = import.meta.env.VITE_ASANA_PROJECT_GID;

export const sectionsApi = createApi({
	reducerPath: "sectionsApi",
	baseQuery: baseQuery(BASE_URL),
	tagTypes: ["Section"],
	endpoints: (builder) => ({
		getSections: builder.query<SectionResponse, void>({
			query: () => `/projects/${PROJECT_GID}/sections?opt_fields=name`,
			providesTags: ["Section"],
		}),
		updateSection: builder.mutation<void, Section>({
			query: ({ gid, name }) => ({
				url: `/sections/${gid}`,
				method: "PUT",
				body: JSON.stringify({ data: { name } }),
			}),
			invalidatesTags: ["Section"],
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				const patch = dispatch(
					sectionsApi.util.updateQueryData(
						"getSections",
						undefined,
						(draft) => {
							const section = draft.data.find(
								(section) => section.gid === arg.gid
							);
							if (section) {
								section.name = arg.name;
							}
						}
					)
				);

				try {
					await queryFulfilled;
				} catch {
					patch.undo();
				}
			},
		}),
	}),
});

export const { useGetSectionsQuery, useUpdateSectionMutation } = sectionsApi;
