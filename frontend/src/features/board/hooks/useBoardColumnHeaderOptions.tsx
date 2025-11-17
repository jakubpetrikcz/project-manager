import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../../components/ui';
import { setEditMode } from '../../../stores/features/uiSlice';
import { AppDispatch } from '../../../stores/store';

export const useBoardColumnHeaderOptions = (gid: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRenameClick = () => {
    dispatch(
      setEditMode({
        id: `editHeader-${gid}`,
        isEdit: true,
      })
    );
  };

  const renderOptions = (
    setIsOptionsOpen?: Dispatch<SetStateAction<boolean>>
  ) => (
    <Button
      text='Rename'
      variant='transparent'
      onClick={() => {
        handleRenameClick();
        setIsOptionsOpen?.(false);
      }}
    />
  );

  return renderOptions;
};
