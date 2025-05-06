import { createApi } from '@reduxjs/toolkit/query/react';

import { TAGS } from '../../constants';
import { CreateTagMutation, TagResponse, TagType } from '../types';

import { baseQuery } from './baseQuery';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const tagsApi = createApi({
	reducerPath: 'tagsApi',
	baseQuery: baseQuery(BASE_URL),
	tagTypes: [TAGS],
	endpoints: (builder) => ({
		getTags: builder.query<TagResponse, void>({
			query: () => '/tags?opt_fields=color,name',
			providesTags: [TAGS],
		}),
		createTag: builder.mutation<void, CreateTagMutation>({
			query: ({ name, color, workspaceGid }) => ({
				url: `/workspaces/${workspaceGid}/tags`,
				method: 'POST',
				body: JSON.stringify({ data: { name, color } }),
			}),
			invalidatesTags: [TAGS],
		}),
		updateTag: builder.mutation<void, TagType>({
			query: ({ gid, name, color }) => ({
				url: `/tags/${gid}`,
				method: 'PUT',
				body: JSON.stringify({ data: { name, color } }),
			}),
			invalidatesTags: [TAGS],
		}),
		deleteTag: builder.mutation<void, string>({
			query: (tagGid) => ({
				url: `/tags/${tagGid}`,
				method: 'DELETE',
			}),
			invalidatesTags: [TAGS],
		}),
	}),
});

export const {
	useGetTagsQuery,
	useCreateTagMutation,
	useDeleteTagMutation,
	useUpdateTagMutation,
} = tagsApi;
