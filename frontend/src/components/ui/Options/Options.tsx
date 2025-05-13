import { Dispatch, ReactNode, SetStateAction, useRef } from 'react';

import { useOutsideClick } from '../../../hooks';

import styles from './Options.module.scss';

type OptionsProps = {
	children: ReactNode;
	setIsOptionsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Options = ({ children, setIsOptionsOpen }: OptionsProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClick(ref, () => setIsOptionsOpen(false));

	return (
		<div className={styles.menu} ref={ref}>
			{children}
		</div>
	);
};
