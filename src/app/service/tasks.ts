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
		// TODO: replace TasksResponse with real type of data from getTasks endpoint
		getTasks: builder.query<TasksResponse, void>({
			query: () =>
				`projects/${projectGid}/tasks?opt_fields=notes,name,tags.name,tags.color`,
		}),
	}),
});

export const { useGetTasksQuery } = tasksApi;
