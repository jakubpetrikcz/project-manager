import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteWrapper, Tag } from '../../../../components/ui';
import { setModalOpen } from '../../../../stores/features/uiSlice';
import {
	isModalOpenSelector,
	modalDataSelector,
} from '../../../../stores/selectors';
import {
	useDeleteTagMutation,
	useGetTagsQuery,
} from '../../../../stores/service/tagsApi';
import { AppDispatch } from '../../../../stores/store';
import { TagType } from '../../../../stores/types';
import { TAG_MODAL } from '../../constants';
import { TagModal } from '../TagModal';

import styles from './TagsPageContent.module.scss';

type TagsPageContentProps = {
	openTagModal: (event?: MouseEvent<HTMLElement>, tag?: TagType) => void;
};

export const TagsPageContent = ({ openTagModal }: TagsPageContentProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data: tags, isLoading, isError } = useGetTagsQuery();
	const isTagModalOpen = useSelector(isModalOpenSelector(TAG_MODAL));
	const tag = useSelector(modalDataSelector(TAG_MODAL)) as TagType;

	const [deleteTag] = useDeleteTagMutation();

	if (isLoading) return <div>Loading...</div>;
	if (isError || !tags) return <div>Error...</div>;

	const closeTagModal = () => {
		dispatch(
			setModalOpen({
				id: TAG_MODAL,
				isOpen: false,
				data: undefined,
			})
		);
	};

	const handleDelete = (
		gid: string,
		event: MouseEvent<HTMLButtonElement>
	) => {
		event.stopPropagation();
		deleteTag(gid);
	};

	return (
		<>
			<div className={styles.container}>
				{tags.data.map((tag) => (
					<DeleteWrapper
						key={tag.gid}
						onClick={(event?: MouseEvent<HTMLElement>) =>
							openTagModal(event, tag)
						}
						element={<Tag text={tag.name} variant={tag.color} />}
						handleRemove={(event) => handleDelete(tag.gid, event)}
						showActionButton={!!tag}
					/>
				))}
			</div>
			{isTagModalOpen && <TagModal tag={tag} close={closeTagModal} />}
		</>
	);
};
