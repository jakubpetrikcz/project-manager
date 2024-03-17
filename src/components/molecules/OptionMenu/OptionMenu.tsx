import { ReactNode, useRef } from "react";
import styles from "./OptionMenu.module.scss";
import { useOutsideClick } from "../../../app/hooks";

type OptionMenuProps = {
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
};

export const OptionMenu: React.FC<OptionMenuProps> = ({
	setShowMenu,
	children,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClick(ref, () => setShowMenu(false));

	return (
		<div className={styles.menu} ref={ref}>
			{children}
		</div>
	);
};