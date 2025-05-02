import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { PlusIcon } from '../../components/icons';
import { Button, PageHeader } from '../../components/ui';
import { setVisibility } from '../../stores/features/uiSlice';
import { AppDispatch } from '../../stores/store';
import { TagType } from '../../stores/types';

import { TagsPageContent } from './components';

import styles from './TagsPage.module.scss';

export const TagsPage = () => {
	const dispatch = useDispatch<AppDispatch>();

	const openTagModal = (_?: MouseEvent<HTMLElement>, tag?: TagType) => {
		dispatch(setVisibility({ id: 'tagModal', isVisible: true, data: tag }));
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
