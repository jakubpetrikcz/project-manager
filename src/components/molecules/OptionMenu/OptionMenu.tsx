import { Dispatch, ReactNode, SetStateAction, useRef } from "react";

import { useOutsideClick } from "../../../hooks";

import styles from "./OptionMenu.module.scss";

type OptionMenuProps = {
	setShowMenu: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
};

export const OptionMenu = ({ setShowMenu, children }: OptionMenuProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClick(ref, () => setShowMenu(false));

	return (
		<div className={styles.menu} ref={ref}>
			{children}
		</div>
	);
};
