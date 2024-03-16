import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Item = {
	gid: string;
	notes: string;
	name: string;
	tags: [
		{
			color: string;
			gid: string;
			name: string;
		}
	];
};

export type TasksResponse = {
	data: Item[];
};

const baseUrl = import.meta.env.VITE_ASANA_BASE_URL;
const projectGid = import.meta.env.VITE_ASANA_PROJECT_GID;

export const tasksApi = createApi({
	reducerPath: "tasksApi",
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
	tagTypes: ["Task", "Section"],
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: (sectionGid) =>
				`https://app.asana.com/api/1.0/sections/${sectionGid}/tasks?opt_fields=memberships.section.name,notes,name,tags.name,tags.color`,
			providesTags: ["Task"],
		}),
		getAttachments: builder.query({
			query: (taskGid) =>
				`attachments?parent=${taskGid}&opt_fields=download_url`,
		}),
		// TODO: replace any with correct types
		getSections: builder.query<{ data: any[] }, void>({
			query: () =>
				`https://app.asana.com/api/1.0/projects/${projectGid}/sections?opt_fields=name`,
			providesTags: ["Section"],
		}),
		deleteTask: builder.mutation<void, string>({
			query: (taskGid) => ({
				url: `https://app.asana.com/api/1.0/tasks/${taskGid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Task"],
		}),
		// TODO: replace any with correct types
		updateSection: builder.mutation<void, any>({
			query: ({ sectionGid, name }) => ({
				url: `https://app.asana.com/api/1.0/sections/${sectionGid}`,
				method: "PUT",
				body: JSON.stringify({ data: { name } }),
			}),
			invalidatesTags: ["Section"],
		}),
	}),
});

export const {
	useGetAttachmentsQuery,
	useGetSectionsQuery,
	useGetTasksQuery,
	useDeleteTaskMutation,
	useUpdateSectionMutation,
} = tasksApi;
