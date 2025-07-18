import toast from 'react-hot-toast';
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../../../stores/service/baseQueryWithReauth';
import { Section, SectionResponse } from '../../../stores/types';
import { SECTION } from '../constants';

export const sectionsApi = createApi({
  reducerPath: 'sectionsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [SECTION],
  endpoints: (builder) => ({
    getSections: builder.query<SectionResponse, string | null>({
      query: (projecGid) => `/projects/${projecGid}/sections?opt_fields=name`,
      providesTags: [SECTION],
    }),
    updateSection: builder.mutation<void, Section>({
      query: ({ gid, name }) => ({
        url: `/sections/${gid}`,
        method: 'PUT',
        body: JSON.stringify({ data: { name } }),
      }),
      invalidatesTags: [SECTION],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          sectionsApi.util.updateQueryData('getSections', arg.gid, (draft) => {
            const section = draft.data.find(
              (section) => section.gid === arg.gid
            );
            if (section) {
              section.name = arg.name;
            }
          })
        );

        try {
          await queryFulfilled;
          toast.success('Section has been successfully updated.');
        } catch {
          patch.undo();
          toast.error('Failed to update section.');
        }
      },
    }),
  }),
});

export const { useGetSectionsQuery, useUpdateSectionMutation } = sectionsApi;
