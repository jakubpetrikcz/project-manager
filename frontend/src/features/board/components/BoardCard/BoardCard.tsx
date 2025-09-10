import { memo, useMemo, useState } from 'react';

import { Card, DropIndicator, ModalWindow } from '../../../../components/ui';
import { removeLinks } from '../../../../utils/removeLinks';
import { useGetAttachmentsQuery } from '../../api/attachmentsApi';
import { useColumnDragAndDrop } from '../../hooks/useColumnDragAndDrop';
import { BoardCardType } from '../../types/card';
import { BoardCardHeader } from '../BoardCardHeader';
import { BoardCardModal } from '../BoardCardModal';

import styles from './BoardCard.module.scss';

type BoardCardProps = BoardCardType & {
  sectionGid: string;
};

export const BoardCard = memo(
  ({ gid, name, notes, tags, sectionGid }: BoardCardProps) => {
    const { data: attachments, isError } = useGetAttachmentsQuery(gid, {
      skip: !gid,
    });
    const { handleDragStart } = useColumnDragAndDrop(sectionGid);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const description = useMemo(() => removeLinks(notes), [notes]);

    const imgSrc = attachments?.data[attachments.data.length - 1]?.download_url;

    if (isError) return <div>Error</div>;

    return (
      <>
        <DropIndicator beforeId={gid} column={sectionGid} />
        <Card
          className={styles.card}
          draggable
          onDragStart={(event) => handleDragStart(event, gid, sectionGid)}
          onClick={() => setIsModalVisible(true)}
        >
          <BoardCardHeader
            gid={gid}
            imgSrc={imgSrc || ''}
            sectionGid={sectionGid}
            name={name}
            tags={tags}
          />
          {description && <p className={styles.description}>{description}</p>}
        </Card>
        {isModalVisible && (
          <ModalWindow
            close={() => setIsModalVisible(false)}
            backgroundImage={imgSrc}
          >
            <BoardCardModal
              gid={gid}
              attachmentGid={attachments?.data[0]?.gid}
              name={name}
              notes={description}
              tags={tags}
              imgSrc={imgSrc}
            />
          </ModalWindow>
        )}
      </>
    );
  }
);
