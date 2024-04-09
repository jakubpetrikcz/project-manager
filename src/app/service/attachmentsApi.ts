import { createApi } from "@reduxjs/toolkit/query/react";

import { AttachmentResponse } from "../types/task";

import { baseQuery } from "./baseQuery";

const BASE_URL = import.meta.env.VITE_ASANA_BASE_URL;

export const attachmentsApi = createApi({
	reducerPath: "attachmentsApi",
	baseQuery: baseQuery(BASE_URL),
	tagTypes: ["Attachment"],
	endpoints: (builder) => ({
		getAttachments: builder.query<AttachmentResponse, string>({
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
	}),
});

export const {
	useGetAttachmentsQuery,
	useUploadAttachmentsMutation,
	useDeleteAttachmentMutation,
} = attachmentsApi;
