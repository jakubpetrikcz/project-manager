import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AttachmentResponse, TaskResponse } from "../types/task";

const baseUrl = import.meta.env.VITE_ASANA_BASE_URL;

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
	tagTypes: ["Task"],
	endpoints: (builder) => ({
		getTasks: builder.query<TaskResponse, string | undefined>({
			query: (sectionGid) =>
				`/sections/${sectionGid}/tasks?opt_fields=memberships.section.name,notes,name,tags.name,tags.color`,
			providesTags: ["Task"],
		}),
		getAttachments: builder.query<AttachmentResponse, string | undefined>({
			query: (taskGid) =>
				`attachments?parent=${taskGid}&opt_fields=download_url`,
		}),
		deleteTask: builder.mutation<void, string>({
			query: (taskGid) => ({
				url: `/tasks/${taskGid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Task"],
		}),
	}),
});

export const {
	useGetAttachmentsQuery,
	useGetTasksQuery,
	useDeleteTaskMutation,
} = tasksApi;
