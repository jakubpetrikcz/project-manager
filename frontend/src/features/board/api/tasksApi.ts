import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../../stores/service/baseQueryWithReauth';
import { TASK } from '../constants';
import {
  CreateTaskArgs,
  CreateTaskResponse,
  TaskResponse,
  TaskSectionArgs,
  TaskTagArgs,
  UpdateTaskArgs,
} from '../types/task';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [TASK],
  endpoints: (builder) => ({
    getTasks: builder.query<TaskResponse, string>({
      query: (sectionGid) =>
        `/sections/${sectionGid}/tasks?opt_fields=memberships.section.name,notes,name,tags.name,tags.color`,
      providesTags: [TASK],
    }),
    createTask: builder.mutation<CreateTaskResponse, CreateTaskArgs>({
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
    updateTask: builder.mutation<void, UpdateTaskArgs>({
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
    addTaskToSection: builder.mutation<void, TaskSectionArgs>({
      query: ({ sectionGid, taskGid, insert_before }) => ({
        url: `/sections/${sectionGid}/addTask`,
        method: 'POST',
        body: JSON.stringify({
          data: { task: taskGid, insert_before },
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
