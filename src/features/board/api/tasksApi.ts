import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../../stores/service/baseQuery';
import { TASK } from '../constants';
import { CreateTaskResponse, TaskResponse, TaskTagArgs } from '../types/task';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	baseQuery: baseQuery(BASE_URL),
	tagTypes: [TASK],
	endpoints: (builder) => ({
		getTasks: builder.query<TaskResponse, string>({
			query: (sectionGid) =>
				`/sections/${sectionGid}/tasks?opt_fields=memberships.section.name,notes,name,tags.name,tags.color`,
			providesTags: [TASK],
		}),
		createTask: builder.mutation<
			CreateTaskResponse,
			{ projectGid: string | null; sectionGid: string; name: string }
		>({
			query: ({ projectGid, sectionGid, name }) => ({
				url: `/tasks`,
				method: 'POST',
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
			invalidatesTags: [TASK],
		}),
		updateTask: builder.mutation<
			void,
			{ gid: string; name?: string; notes?: string }
		>({
			query: ({ gid, name, notes }) => ({
				url: `/tasks/${gid}`,
				method: 'PUT',
				body: JSON.stringify({ data: { name, notes } }),
			}),
			invalidatesTags: [TASK],
		}),
		deleteTask: builder.mutation<void, string>({
			query: (taskGid) => ({
				url: `/tasks/${taskGid}`,
				method: 'DELETE',
			}),
			invalidatesTags: [TASK],
		}),
		addTagToTask: builder.mutation<void, TaskTagArgs>({
			query: ({ taskGid, tagGid }) => ({
				url: `/tasks/${taskGid}/addTag`,
				method: 'POST',
				body: JSON.stringify({ data: { tag: tagGid } }),
			}),
			invalidatesTags: [TASK],
		}),
		removeTagFromTask: builder.mutation<void, TaskTagArgs>({
			query: ({ taskGid, tagGid }) => ({
				url: `/tasks/${taskGid}/removeTag`,
				method: 'POST',
				body: JSON.stringify({ data: { tag: tagGid } }),
			}),
			invalidatesTags: [TASK],
		}),
		addTaskToSection: builder.mutation<
			void,
			{ sectionGid: string; taskGid: string }
		>({
			query: ({ sectionGid, taskGid }) => ({
				url: `/sections/${sectionGid}/addTask`,
				method: 'POST',
				body: JSON.stringify({
					data: { task: taskGid, insert_before: null },
				}),
			}),
			invalidatesTags: [TASK],
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
