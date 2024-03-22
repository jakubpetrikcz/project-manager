import { ReactNode, useRef } from "react";
import styles from "./OptionMenu.module.scss";
import { useOutsideClick } from "../../../hooks";

type OptionMenuProps = {
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
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
