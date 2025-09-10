import { MouseEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setModalOpen } from '../../../../stores/features/uiSlice';
import {
  isModalOpenSelector,
  modalDataSelector,
} from '../../../../stores/selectors';
import { AppDispatch } from '../../../../stores/store';
import { TagType } from '../../../../stores/types';
import { TAG_MODAL } from '../../constants';
import { TagModal } from '../TagModal';
import { Tags } from '..';

import styles from './TagsPageContent.module.scss';

type TagsPageContentProps = {
  openTagModal: (event?: MouseEvent<HTMLElement>, tag?: TagType) => void;
  workspaceId: string;
};

export const TagsPageContent = ({
  openTagModal,
  workspaceId,
}: TagsPageContentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isTagModalOpen = useSelector(isModalOpenSelector(TAG_MODAL));
  const tag = useSelector(modalDataSelector(TAG_MODAL)) as TagType;

  const closeTagModal = useCallback(() => {
    dispatch(
      setModalOpen({
        id: TAG_MODAL,
        isOpen: false,
        data: undefined,
      })
    );
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <Tags openTagModal={openTagModal} workspaceId={workspaceId} />
      </div>
      {isTagModalOpen && (
        <TagModal tag={tag} close={closeTagModal} workspaceId={workspaceId} />
      )}
    </>
  );
};
