import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagResponse } from "../types/task";

const baseUrl = import.meta.env.VITE_ASANA_BASE_URL;
const workspace_gid = import.meta.env.VITE_ASANA_WORKSPACE_GID;

export const tagsApi = createApi({
	reducerPath: "tagsApi",
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
	tagTypes: ["Tags"],
	endpoints: (builder) => ({
		getTags: builder.query<TagResponse, void>({
			query: () => "/tags?opt_fields=color,name",
			providesTags: ["Tags"],
		}),
		// TODO: dořešit typ
		createTag: builder.mutation<void, {name: string, color: string}>({
			query: ({ name, color }) => ({
				url: `/workspaces/${workspace_gid}/tags`,
				method: "POST",
				body: JSON.stringify({ data: { name, color } }),
			}),
			invalidatesTags: ["Tags"],
		}),
	}),
});

export const { useGetTagsQuery, useCreateTagMutation } = tagsApi;
