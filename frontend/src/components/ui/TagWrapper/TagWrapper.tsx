import { memo, MouseEvent } from 'react';

import { TagType } from '../../../stores/types';
import { DeleteWrapper } from '../DeleteWrapper';
import { Tag } from '../Tag';

type TagWrapperProps = {
  tag: TagType;
  onClick?: (event?: MouseEvent<HTMLElement>, tag?: TagType) => void;
  handleRemove: (event: MouseEvent<HTMLButtonElement>, gid: string) => void;
};

export const TagWrapper = memo(
  ({ tag, onClick, handleRemove }: TagWrapperProps) => {
    const handleOnClick = (event?: MouseEvent<HTMLElement>) => {
      onClick?.(event, tag);
    };

    const removeTag = (event: MouseEvent<HTMLButtonElement>) => {
      handleRemove(event, tag.gid);
    };

    return (
      <DeleteWrapper
        onClick={handleOnClick}
        element={<Tag text={tag.name} variant={tag.color} />}
        handleRemove={removeTag}
        showActionButton={!!tag}
      />
    );
  }
);
