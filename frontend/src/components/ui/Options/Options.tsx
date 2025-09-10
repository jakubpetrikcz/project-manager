import {
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from 'react';

import { useOutsideClick } from '../../../hooks';
import { HorizontalDotsIcon, VerticalDotsIcon } from '../../icons';
import { IconButton } from '../IconButton';

import styles from './Options.module.scss';

type OptionsProps = {
  children:
    | ((setIsOptionsOpen: Dispatch<SetStateAction<boolean>>) => ReactNode)
    | ReactNode;
  vertical?: boolean;
};

export const Options = ({ children, vertical }: OptionsProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOptionsOpen((prevState) => !prevState);
  };

  useOutsideClick(ref, () => setIsOptionsOpen(false));

  return (
    <>
      <IconButton
        icon={vertical ? <VerticalDotsIcon /> : <HorizontalDotsIcon />}
        onClick={toggleMenu}
      />
      {isOptionsOpen && (
        <div className={styles.menu} ref={ref}>
          {typeof children === 'function'
            ? children(setIsOptionsOpen)
            : children}
        </div>
      )}
    </>
  );
};
