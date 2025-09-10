import toast from 'react-hot-toast';
import { createApi } from '@reduxjs/toolkit/query/react';

import { TAGS } from '../../constants';
import { CreateTagMutation, TagResponse, TagType } from '../types';

import { baseQueryWithReauth } from './baseQueryWithReauth';

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [TAGS],
  endpoints: (builder) => ({
    getTags: builder.query<TagResponse, string>({
      query: (workspaceGid) =>
        `/tags?workspace=${workspaceGid}&opt_fields=color,name`,
      providesTags: [TAGS],
    }),
    createTag: builder.mutation<void, CreateTagMutation>({
      query: ({ name, color, workspaceGid }) => ({
        url: `/workspaces/${workspaceGid}/tags`,
        method: 'POST',
        body: JSON.stringify({ data: { name, color } }),
      }),
      invalidatesTags: [TAGS],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Tag has been successfully created.');
        } catch (err) {
          toast.error('Failed to create a tag.');
        }
      },
    }),
    updateTag: builder.mutation<void, TagType>({
      query: ({ gid, name, color }) => ({
        url: `/tags/${gid}`,
        method: 'PUT',
        body: JSON.stringify({ data: { name, color } }),
      }),
      invalidatesTags: [TAGS],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Tag was successfully modified.');
        } catch (err) {
          toast.error('Failed to modify the tag.');
        }
      },
    }),
    deleteTag: builder.mutation<void, string>({
      query: (tagGid) => ({
        url: `/tags/${tagGid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Tag was successfully deleted.');
        } catch (err) {
          toast.error('Failed to delete tag.');
        }
      },
    }),
  }),
});

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
} = tagsApi;
