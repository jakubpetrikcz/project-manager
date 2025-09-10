import { ChangeEvent } from 'react';

import { Attachment, DeleteWrapper } from '../../../../components/ui';
import { useGetWorkspacesQuery } from '../../../../stores/service/workspacesApi';
import { compressImg } from '../../../../utils/compressImg';
import {
  useDeleteAttachmentMutation,
  useUploadAttachmentsMutation,
} from '../../api/attachmentsApi';
import { BoardCardType } from '../../types/card';
import { BoardDescriptionCardModal } from '../BoardDescriptionCardModal';
import { BoardHeaderCardModal } from '../BoardHeaderCardModal';

type BoardCardModalProps = BoardCardType & {
  attachmentGid?: string;
  sectionGid?: string;
};

export const BoardCardModal = ({
  gid,
  name,
  notes,
  tags,
  imgSrc,
  attachmentGid,
}: BoardCardModalProps) => {
  const {
    data: workspaces,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useGetWorkspacesQuery();
  const [uploadAttachments] = useUploadAttachmentsMutation();
  const [deleteAttachment] = useDeleteAttachmentMutation();

  const handleRemoveAttachment = () => {
    if (attachmentGid) {
      deleteAttachment({ attachmentGid });
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const compressedFile = await compressImg(event.target.files[0]);
        const formData = new FormData();
        formData.append('file', compressedFile, compressedFile.name);
        formData.append('parent', gid);
        await uploadAttachments({ taskGid: gid, file: formData });
        handleRemoveAttachment();
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    }
  };

  if (isWorkspacesLoading) return <div>Loading...</div>;

  if (isWorkspacesError || !workspaces) return <div>Error</div>;

  return (
    <>
      <BoardHeaderCardModal
        gid={gid}
        name={name}
        tags={tags}
        workspaceId={workspaces.data[0].gid}
      />
      <BoardDescriptionCardModal gid={gid} notes={notes} />
      <DeleteWrapper
        element={<Attachment onChange={handleUpload} imgSrc={imgSrc} />}
        handleRemove={handleRemoveAttachment}
        showActionButton={!!imgSrc}
      />
    </>
  );
};
