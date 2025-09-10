import { memo } from 'react';
import { useDispatch } from 'react-redux';

import {
  Badge,
  Button,
  ButtonEnum,
  Card,
  EditableText,
  Options,
} from '../../../../components/ui';
import { setEditMode } from '../../../../stores/features/uiSlice';
import { AppDispatch } from '../../../../stores/store';
import { useUpdateSectionMutation } from '../../api/sectionsApi';
import { useGetTasksQuery } from '../../api/tasksApi';
import { UNTITLED_SECTION } from '../../constants';

import styles from './BoardColumnHeader.module.scss';

type BoardColumnHeaderProps = {
  gid: string;
  title: string;
};

export const BoardColumnHeader = memo(
  ({ gid, title }: BoardColumnHeaderProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: tasks } = useGetTasksQuery(gid);
    const [updateSection] = useUpdateSectionMutation();

    const handleUpdateSection = (text: string) => {
      if (text !== title) {
        updateSection({
          gid,
          name: text || UNTITLED_SECTION,
        });
      }
    };

    const handleRenameClick = () => {
      dispatch(
        setEditMode({
          id: `editHeader-${gid}`,
          isEdit: true,
        })
      );
    };

    return (
      <Card className={styles.card}>
        <div className={styles.left}>
          <EditableText
            gid={`editHeader-${gid}`}
            value={title}
            updateText={handleUpdateSection}
            emptyText={UNTITLED_SECTION}
          >
            <span className={styles.text}>{title || UNTITLED_SECTION}</span>
          </EditableText>
          <Badge text={tasks?.data.length.toString() || '0'} />
        </div>
        <div className={styles.right}>
          <Options>
            {(setIsOptionsOpen) => (
              <Button
                text='Rename'
                variant={ButtonEnum.transparent}
                onClick={() => {
                  handleRenameClick();
                  setIsOptionsOpen(false);
                }}
              />
            )}
          </Options>
        </div>
      </Card>
    );
  }
);
