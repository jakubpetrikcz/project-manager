import { createApi } from "@reduxjs/toolkit/query/react";

import { CreateTaskResponse, TaskResponse, TaskTagArgs } from "../types/task";

import { baseQuery } from "./baseQuery";

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;
const PROJECT_GID = import.meta.env.VITE_ASANA_PROJECT_GID;

export const tasksApi = createApi({
	reducerPath: "tasksApi",
	baseQuery: baseQuery(BASE_URL),
	tagTypes: ["Task"],
	endpoints: (builder) => ({
		getTasks: builder.query<TaskResponse, string>({
			query: (sectionGid) =>
				`/sections/${sectionGid}/tasks?opt_fields=memberships.section.name,notes,name,tags.name,tags.color`,
			providesTags: ["Task"],
		}),
		createTask: builder.mutation<
			CreateTaskResponse,
			{ sectionGid: string; name: string }
		>({
			query: ({ sectionGid, name }) => ({
				url: `/tasks`,
				method: "POST",
				body: JSON.stringify({
					data: {
						name,
						projects: [PROJECT_GID],
						memberships: [
							{
								project: PROJECT_GID,
								section: sectionGid,
							},
						],
						insert_before: null,
					},
				}),
			}),
			invalidatesTags: ["Task"],
		}),
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
		addTagToTask: builder.mutation<void, TaskTagArgs>({
			query: ({ taskGid, tagGid }) => ({
				url: `/tasks/${taskGid}/addTag`,
				method: "POST",
				body: JSON.stringify({ data: { tag: tagGid } }),
			}),
			invalidatesTags: ["Task"],
		}),
		removeTagFromTask: builder.mutation<void, TaskTagArgs>({
			query: ({ taskGid, tagGid }) => ({
				url: `/tasks/${taskGid}/removeTag`,
				method: "POST",
				body: JSON.stringify({ data: { tag: tagGid } }),
			}),
			invalidatesTags: ["Task"],
		}),
		addTaskToSection: builder.mutation<
			void,
			{ sectionGid: string; taskGid: string }
		>({
			query: ({ sectionGid, taskGid }) => ({
				url: `/sections/${sectionGid}/addTask`,
				method: "POST",
				body: JSON.stringify({
					data: { task: taskGid, insert_before: null },
				}),
			}),
			invalidatesTags: ["Task"],
		}),
	}),
});

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
	useAddTagToTaskMutation,
	useRemoveTagFromTaskMutation,
	useAddTaskToSectionMutation,
} = tasksApi;
