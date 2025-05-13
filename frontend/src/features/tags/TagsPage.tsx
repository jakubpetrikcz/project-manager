import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { PlusIcon } from '../../components/icons';
import { Button, PageHeader } from '../../components/ui';
import { setModalOpen } from '../../stores/features/uiSlice';
import { AppDispatch } from '../../stores/store';
import { TagType } from '../../stores/types';

import { TagsPageContent } from './components';
import { TAG_MODAL } from './constants';

import styles from './TagsPage.module.scss';

export const TagsPage = () => {
	const dispatch = useDispatch<AppDispatch>();

	const openTagModal = (_?: MouseEvent<HTMLElement>, tag?: TagType) => {
		dispatch(setModalOpen({ id: TAG_MODAL, isOpen: true, data: tag }));
	};

	return (
		<section className={styles.section}>
			<PageHeader title='Tags'>
				<Button
					className={styles.button}
					icon={<PlusIcon color='white' />}
					text='Add new tag'
					onClick={openTagModal}
				/>
			</PageHeader>
			<TagsPageContent openTagModal={openTagModal} />
		</section>
	);
};
