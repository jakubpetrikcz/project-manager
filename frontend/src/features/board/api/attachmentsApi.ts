import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../../stores/service/baseQueryWithReauth';
import { ATTACHMENT } from '../constants';
import {
  AttachmentResponse,
  UploadAttachmentsArgs,
  UploadAttachmentsResponse,
} from '../types/attachment';

export const attachmentsApi = createApi({
  reducerPath: 'attachmentsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [ATTACHMENT],
  endpoints: (builder) => ({
    getAttachments: builder.query<AttachmentResponse, string>({
      query: (taskGid) =>
        `attachments?parent=${taskGid}&opt_fields=download_url`,
      providesTags: [ATTACHMENT],
    }),
    uploadAttachments: builder.mutation<
      UploadAttachmentsResponse,
      UploadAttachmentsArgs
    >({
      query: ({ file }) => ({
        url: '/attachments',
        method: 'POST',
        body: file,
      }),
      invalidatesTags: [ATTACHMENT],
    }),
    deleteAttachment: builder.mutation<void, string>({
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
