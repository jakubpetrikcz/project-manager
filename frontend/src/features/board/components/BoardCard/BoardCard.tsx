import { DragEvent, useMemo, useState } from 'react';

import { Card, DropIndicator, ModalWindow } from '../../../../components/ui';
import { removeLinks } from '../../../../utils/removeLinks';
import { useGetAttachmentsQuery } from '../../api/attachmentsApi';
import { BoardCardType } from '../../types/card';
import { BoardCardHeader } from '../BoardCardHeader';
import { BoardCardModal } from '../BoardCardModal';

import styles from './BoardCard.module.scss';

type BoardCardProps = BoardCardType & {
	sectionGid: string;
};

export const BoardCard = ({
	gid,
	name,
	notes,
	tags,
	sectionGid,
}: BoardCardProps) => {
	const { data: attachments, isError } = useGetAttachmentsQuery(gid, {
		skip: !gid,
	});
	const [isModalVisible, setIsModalVisible] = useState(false);

	const description = useMemo(() => removeLinks(notes), [notes]);
	
	const imgSrc = useMemo(
		() => attachments?.data[attachments.data.length - 1]?.download_url,
		[attachments?.data]
	);
	
	if (isError) return <div>Error</div>;

	const handleDragStart = (
		event: DragEvent<HTMLElement>,
		taskGid: string,
		sectionGid: string
	) => {
		event.dataTransfer.setData('taskGid', taskGid);
		event.dataTransfer.setData('sectionGid', sectionGid);
		event.dataTransfer.effectAllowed = 'move';
	};

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
				{description && (
					<p className={styles.description}>{description}</p>
				)}
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
};
