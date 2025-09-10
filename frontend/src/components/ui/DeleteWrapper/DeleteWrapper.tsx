import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

import { CloseIcon } from '../../icons';
import { IconButton } from '..';

import styles from './DeleteWrapper.module.scss';

type DeleteWrapperProps = {
  element: ReactNode;
  handleRemove: (event: MouseEvent<HTMLButtonElement>) => void;
  showActionButton: boolean;
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
};

export const DeleteWrapper = ({
  element,
  handleRemove,
  showActionButton,
  onClick,
}: DeleteWrapperProps) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.clickable]: onClick,
      })}
      onClick={onClick}
    >
      {element}
      {showActionButton && (
        <IconButton
          className={styles.close}
          icon={<CloseIcon color='black' />}
          onClick={handleRemove}
        />
      )}
    </div>
  );
};
