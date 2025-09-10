import toast from 'react-hot-toast';
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../../stores/service/baseQueryWithReauth';
import { TASK } from '../constants';
import {
  CreateTaskArgs,
  CreateTaskResponse,
  DeleteTaskArgs,
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
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ gid }) => ({
                type: TASK,
                id: gid,
              })),
              TASK,
            ]
          : [TASK],
    }),
    createTask: builder.mutation<CreateTaskResponse, CreateTaskArgs>({
      query: ({ projectGid, sectionGid, name }) => ({
        url: '/tasks',
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
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Task has been successfully created.');
        } catch (err) {
          toast.error('Failed to create a task.');
        }
      },
    }),
    updateTask: builder.mutation<void, UpdateTaskArgs>({
      query: ({ gid, name, notes }) => ({
        url: `/tasks/${gid}`,
        method: 'PUT',
        body: JSON.stringify({ data: { name, notes } }),
      }),
      invalidatesTags: (_result, _error, { gid }) => [{ type: TASK, id: gid }],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Task was successfully modified.');
        } catch (err) {
          toast.error('Failed to modify the task.');
        }
      },
    }),
    deleteTask: builder.mutation<void, DeleteTaskArgs>({
      query: ({ taskGid }) => ({
        url: `/tasks/${taskGid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { taskGid }) => [
        { type: TASK, id: taskGid },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Task was successfully deleted.');
        } catch (err) {
          toast.error('Failed to delete task.');
        }
      },
    }),
    addTagToTask: builder.mutation<void, TaskTagArgs>({
      query: ({ taskGid, tagGid }) => ({
        url: `/tasks/${taskGid}/addTag`,
        method: 'POST',
        body: JSON.stringify({ data: { tag: tagGid } }),
      }),
      invalidatesTags: (_result, _error, { taskGid }) => [
        { type: TASK, id: taskGid },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Tag has been successfully added to the task.');
        } catch (err) {
          toast.error('Tag could not be added to the task.');
        }
      },
    }),
    removeTagFromTask: builder.mutation<void, TaskTagArgs>({
      query: ({ taskGid, tagGid }) => ({
        url: `/tasks/${taskGid}/removeTag`,
        method: 'POST',
        body: JSON.stringify({ data: { tag: tagGid } }),
      }),
      invalidatesTags: (_result, _error, { taskGid }) => [
        { type: TASK, id: taskGid },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Tag has been successfully deleted from the task.');
        } catch (err) {
          toast.error('Tag could not be deleted from the task.');
        }
      },
    }),
    addTaskToSection: builder.mutation<void, TaskSectionArgs>({
      query: ({ sectionGid, taskGid, insert_before }) => ({
        url: `/sections/${sectionGid}/addTask`,
        method: 'POST',
        body: JSON.stringify({
          data: { task: taskGid, insert_before },
        }),
      }),
      invalidatesTags: (_result, _error, { taskGid }) => [
        { type: TASK, id: taskGid },
      ],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Task has been successfully moved.');
        } catch (err) {
          toast.error('Failed to move task.');
        }
      },
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
