import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	AttachmentResponse,
	TaskResponse,
	createTaskResponse,
} from "../types/task";

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
	tagTypes: ["Task", "Attachment"],
	endpoints: (builder) => ({
		getTasks: builder.query<TaskResponse, string | undefined>({
			query: (sectionGid) =>
				`/sections/${sectionGid}/tasks?opt_fields=memberships.section.name,notes,name,tags.name,tags.color`,
			providesTags: ["Task"],
		}),
		getAttachments: builder.query<AttachmentResponse, string | undefined>({
			query: (taskGid) =>
				`attachments?parent=${taskGid}&opt_fields=download_url`,
			providesTags: ["Attachment"],
		}),
		uploadAttachments: builder.mutation({
			query: ({ file }) => {
				return {
					url: `/attachments`,
					method: "POST",
					body: file,
				};
			},
			invalidatesTags: ["Attachment"],
		}),
		deleteAttachment: builder.mutation({
			query: (attachmentGid) => ({
				url: `/attachments/${attachmentGid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Attachment"],
		}),
		// TODO: dořešit type
		createTask: builder.mutation<
			createTaskResponse,
			{ sectionGid: string; name: string }
		>({
			query: ({ sectionGid, name }) => ({
				url: `/tasks`,
				method: "POST",
				body: JSON.stringify({
					data: {
						name,
						projects: [projectGid],
						memberships: [
							{
								project: projectGid,
								section: sectionGid,
							},
						],
						insert_before: null,
					},
				}),
			}),
			invalidatesTags: ["Task"],
		}),
		// TODO: dořešit type
		updateTask: builder.mutation<
			void,
			{ gid: string; name?: string; notes?: string }
		>({
			query: ({ gid, name, notes }) => ({
				url: `/tasks/${gid}`,
				method: "PUT",
				body: JSON.stringify({ data: { name, notes } }),
			}),
			invalidatesTags: ["Task"],
		}),
		deleteTask: builder.mutation<void, string>({
			query: (taskGid) => ({
				url: `/tasks/${taskGid}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Task"],
		}),
		addTagToTask: builder.mutation<
			void,
			{ taskGid: string; tagGid: string }
		>({
			query: ({ taskGid, tagGid }) => ({
				url: `/tasks/${taskGid}/addTag`,
				method: "POST",
				body: JSON.stringify({ data: { tag: tagGid } }),
			}),
			invalidatesTags: ["Task"],
		}),
		removeTagFromTask: builder.mutation<
			void,
			{ taskGid: string; tagGid: string }
		>({
			query: ({ taskGid, tagGid }) => ({
				url: `/tasks/${taskGid}/removeTag`,
				method: "POST",
				body: JSON.stringify({ data: { tag: tagGid } }),
			}),
			invalidatesTags: ["Task"],
		}),
	}),
});

export const {
	useGetAttachmentsQuery,
	useGetTasksQuery,
	useUploadAttachmentsMutation,
	useDeleteAttachmentMutation,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
	useAddTagToTaskMutation,
	useRemoveTagFromTaskMutation,
} = tasksApi;
