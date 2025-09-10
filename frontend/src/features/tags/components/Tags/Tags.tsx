import { memo, MouseEvent, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import { TagWrapper } from '../../../../components/ui';
import {
  useDeleteTagMutation,
  useGetTagsQuery,
} from '../../../../stores/service/tagsApi';
import { TagType } from '../../../../stores/types';

type TagsProps = {
  openTagModal: (event?: MouseEvent<HTMLElement>, tag?: TagType) => void;
  workspaceId: string;
};

export const Tags = memo(({ openTagModal, workspaceId }: TagsProps) => {
  const { data: tags, isLoading, isError } = useGetTagsQuery(workspaceId);
  const [deleteTag] = useDeleteTagMutation();

  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>, gid: string) => {
      event.stopPropagation();
      deleteTag(gid);
    },
    [deleteTag]
  );

  if (isLoading) {
    return Array(8)
      .fill(0)
      .map((_, i) => <Skeleton key={i} width={100} height={30} />);
  }

  if (isError || !tags) return <div>Error</div>;

  return tags.data.map((tag) => (
    <TagWrapper
      key={tag.gid}
      tag={tag}
      onClick={openTagModal}
      handleRemove={handleDelete}
    />
  ));
});
