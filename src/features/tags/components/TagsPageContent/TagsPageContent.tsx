import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteWrapper, Tag } from '../../../../components/ui';
import { setVisibility } from '../../../../stores/features/uiSlice';
import {
	useDeleteTagMutation,
	useGetTagsQuery,
} from '../../../../stores/service/tagsApi';
import { AppDispatch, RootState } from '../../../../stores/store';
import { TagType } from '../../../../stores/types';
import { TagModal } from '../TagModal';

import styles from './TagsPageContent.module.scss';

type TagsPageContentProps = {
	openTagModal: (event?: MouseEvent<HTMLElement>, tag?: TagType) => void;
};

export const TagsPageContent = ({ openTagModal }: TagsPageContentProps) => {
	const { data: tags, isLoading, isError } = useGetTagsQuery();
	const dispatch = useDispatch<AppDispatch>();
	const isModalVisible = useSelector(
		(state: RootState) => state.ui.visibility['tagModal']
	);
	const tag = useSelector((state: RootState) => state.ui.data['tagModal']);

	const closeTagModal = () => {
		dispatch(
			setVisibility({
				id: 'tagModal',
				isVisible: false,
				data: undefined,
			})
		);
	};

	const [deleteTag] = useDeleteTagMutation();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

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
				{tags?.data.map((tag) => (
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
			{isModalVisible && (
				<TagModal tag={tag as TagType} close={closeTagModal} />
			)}
		</>
	);
};
