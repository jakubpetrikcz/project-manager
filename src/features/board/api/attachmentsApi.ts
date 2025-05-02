import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../../stores/service/baseQuery';
import { ATTACHMENT } from '../constants';
import { AttachmentResponse } from '../types/task';

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const attachmentsApi = createApi({
	reducerPath: 'attachmentsApi',
	baseQuery: baseQuery(BASE_URL),
	tagTypes: [ATTACHMENT],
	endpoints: (builder) => ({
		getAttachments: builder.query<AttachmentResponse, string>({
			query: (taskGid) =>
				`attachments?parent=${taskGid}&opt_fields=download_url`,
			providesTags: [ATTACHMENT],
		}),
		uploadAttachments: builder.mutation({
			query: ({ file }) => ({
				url: '/attachments',
				method: 'POST',
				body: file,
			}),
			invalidatesTags: [ATTACHMENT],
		}),
		deleteAttachment: builder.mutation({
			query: (attachmentGid) => ({
				url: `/attachments/${attachmentGid}`,
				method: 'DELETE',
			}),
			invalidatesTags: [ATTACHMENT],
		}),
	}),
});

export const {
	useGetAttachmentsQuery,
	useUploadAttachmentsMutation,
	useDeleteAttachmentMutation,
} = attachmentsApi;
