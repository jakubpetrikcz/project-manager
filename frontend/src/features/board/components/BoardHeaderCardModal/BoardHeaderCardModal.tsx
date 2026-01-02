import { memo, MouseEvent, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { PlusIcon } from '../../../../components/icons';
import {
  Dropdown,
  EditableText,
  IconButton,
  TagWrapper,
} from '../../../../components/ui';
import { useGetTagsQuery } from '../../../../stores/service/tagsApi';
import { TagType } from '../../../../stores/types';
import {
  useAddTagToTaskMutation,
  useDeleteTaskMutation,
  useRemoveTagFromTaskMutation,
  useUpdateTaskMutation,
} from '../../api/tasksApi';

import styles from './BoardHeaderCardModal.module.scss';

type BoardHeaderCardModalProps = {
  gid: string;
  name: string;
  tags: TagType[];
  workspaceId: string;
};

export const BoardHeaderCardModal = memo(
  ({ gid, name, tags, workspaceId }: BoardHeaderCardModalProps) => {
    const { data, isLoading } = useGetTagsQuery(workspaceId);
    const [editableTitle, setEditableTitle] = useState(name);
    const [isSelectingTags, setIsSelectingTags] = useState(false);

    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    const [addTagToTask] = useAddTagToTaskMutation();
    const [removeTagFromTask] = useRemoveTagFromTaskMutation();

    const dropdownOptions = data?.data.map((tag) => ({
      id: tag.gid,
      value: tag.name,
    }));

    const handleSelectTag = (selectedId: string) => {
      setIsSelectingTags(false);
      addTagToTask({ taskGid: gid, tagGid: selectedId });
    };

    const handleUpdateTitle = (title: string) => {
      setEditableTitle(title);

      if (title !== editableTitle) {
        updateTask({
          gid,
          name: title,
        });
      }

      if (!title) deleteTask({ taskGid: gid });
    };

    const handleRemoveTagFromTask = (
      _: MouseEvent<HTMLButtonElement>,
      tagGid: string
    ) => {
      removeTagFromTask({
        taskGid: gid,
        tagGid,
      });
    };

    return (
      <div className={styles.content}>
        <div className={styles.text}>
          {isLoading ? (
            <Skeleton height={60} />
          ) : (
            <EditableText
              gid={`editTitle-${gid}`}
              value={name}
              updateText={handleUpdateTitle}
            >
              <h3 className={styles.title}>{editableTitle}</h3>
            </EditableText>
          )}
        </div>
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagWrapper
              key={tag.gid}
              tag={tag}
              handleRemove={handleRemoveTagFromTask}
            />
          ))
        ) : !isSelectingTags ? (
          <IconButton
            icon={<PlusIcon />}
            onClick={() => setIsSelectingTags(true)}
          />
        ) : (
          <Dropdown
            options={dropdownOptions ? dropdownOptions : []}
            onSelect={handleSelectTag}
          />
        )}
      </div>
    );
  }
);
