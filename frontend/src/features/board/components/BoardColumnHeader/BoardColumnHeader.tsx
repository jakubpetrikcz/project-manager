import { memo } from 'react';

import { Badge, Card, EditableText, Options } from '../../../../components/ui';
import { useUpdateSectionMutation } from '../../api/sectionsApi';
import { useGetTasksQuery } from '../../api/tasksApi';
import { UNTITLED_SECTION } from '../../constants';
import { useBoardColumnHeaderOptions } from '../../hooks/useBoardColumnHeaderOptions';

import styles from './BoardColumnHeader.module.scss';

type BoardColumnHeaderProps = {
  gid: string;
  title: string;
};

export const BoardColumnHeader = memo(
  ({ gid, title }: BoardColumnHeaderProps) => {
    const { data: tasks } = useGetTasksQuery(gid);
    const [updateSection] = useUpdateSectionMutation();
    const renderOptions = useBoardColumnHeaderOptions(gid);

    const handleUpdateSection = (text: string) => {
      if (text !== title) {
        updateSection({
          gid,
          name: text || UNTITLED_SECTION,
        });
      }
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
          <Options renderOptions={renderOptions} />
        </div>
      </Card>
    );
  }
);
