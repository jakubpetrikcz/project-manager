import { createApi } from "@reduxjs/toolkit/query/react";

import { TagResponse, TagType } from "../types";

import { baseQuery } from "./baseQuery";

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;
const WORKSPACE_GID = import.meta.env.VITE_ASANA_WORKSPACE_GID;

export const tagsApi = createApi({
	reducerPath: "tagsApi",
	baseQuery: baseQuery(BASE_URL),
	tagTypes: ["Tags"],
	endpoints: (builder) => ({
		getTags: builder.query<TagResponse, void>({
			query: () => "/tags?opt_fields=color,name",
			providesTags: ["Tags"],
		}),
		createTag: builder.mutation<void, { name: string; color: string }>({
			query: ({ name, color }) => ({
				url: `/workspaces/${WORKSPACE_GID}/tags`,
				method: "POST",
				body: JSON.stringify({ data: { name, color } }),
			}),
			invalidatesTags: ["Tags"],
		}),
		updateTag: builder.mutation<void, TagType>({
			query: ({ gid, name, color }) => ({
				url: `/tags/${gid}`,
				method: "PUT",
				body: JSON.stringify({ data: { name, color } }),
			}),
			invalidatesTags: ["Tags"],
		}),
		deleteTag: builder.mutation<void, string>({
			query: (tagGid) => ({
				url: `/tags/${tagGid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Tags"],
		}),
	}),
});

export const {
	useGetTagsQuery,
	useCreateTagMutation,
	useDeleteTagMutation,
	useUpdateTagMutation,
} = tagsApi;
