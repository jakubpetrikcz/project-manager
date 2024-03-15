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
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: (sectionGid) =>
				`https://app.asana.com/api/1.0/sections/${sectionGid}/tasks?opt_fields=memberships.section.name,notes,name,tags.name,tags.color`,
		}),
		getAttachments: builder.query({
			query: (taskGid) =>
				`attachments?parent=${taskGid}&opt_fields=download_url`,
		}),
		// TODO: replace any with correct types
		getSections: builder.query<{ data: any[] }, void>({
			query: () =>
				`https://app.asana.com/api/1.0/projects/${projectGid}/sections?opt_fields=name`,
		}),
	}),
});

export const { useGetAttachmentsQuery, useGetSectionsQuery, useGetTasksQuery } =
	tasksApi;
