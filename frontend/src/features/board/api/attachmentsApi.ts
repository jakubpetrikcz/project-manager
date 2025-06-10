import toast from 'react-hot-toast';
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
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Attachment has been successfully uploaded.');
        } catch (err) {
          toast.error('Failed to upload attachment.');
        }
      },
    }),
    deleteAttachment: builder.mutation<void, string>({
      query: (attachmentGid) => ({
        url: `/attachments/${attachmentGid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ATTACHMENT],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Attachment has been successfully deleted.');
        } catch (err) {
          toast.error('Failed to delete attachment.');
        }
      },
    }),
  }),
});

export const {
  useGetAttachmentsQuery,
  useUploadAttachmentsMutation,
  useDeleteAttachmentMutation,
} = attachmentsApi;
