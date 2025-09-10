import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { PlusIcon } from '../../components/icons';
import { Button, PageHeader } from '../../components/ui';
import { setModalOpen } from '../../stores/features/uiSlice';
import { useGetWorkspacesQuery } from '../../stores/service/workspacesApi';
import { AppDispatch } from '../../stores/store';
import { TagType } from '../../stores/types';

import { TagsPageContent } from './components';
import { TAG_MODAL } from './constants';

import styles from './TagsPage.module.scss';

export const TagsPage = () => {
  const {
    data: workspaces,
    isLoading: isWorkspacesLoading,
    isError: isWorkspacesError,
  } = useGetWorkspacesQuery();
  const dispatch = useDispatch<AppDispatch>();

  const openTagModal = useCallback(
    (_?: MouseEvent<HTMLElement>, tag?: TagType) => {
      console.log('tag', tag);
      dispatch(setModalOpen({ id: TAG_MODAL, isOpen: true, data: tag }));
    },
    [dispatch]
  );

  if (isWorkspacesLoading) return <div>Loading...</div>;

  if (isWorkspacesError || !workspaces) return <div>Error</div>;

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
      <TagsPageContent
        openTagModal={openTagModal}
        workspaceId={workspaces.data[0].gid}
      />
    </section>
  );
};
