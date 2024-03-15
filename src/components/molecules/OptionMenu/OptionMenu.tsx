import { MouseEvent, useRef } from "react";
import { Button } from "../../atoms";
import { ButtonEnum } from "../../atoms/Button/ButtonEnums";
import styles from "./OptionMenu.module.scss";
import { useOutsideClick } from "../../../app/hooks";

type OptionMenuProps = {
	onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OptionMenu: React.FC<OptionMenuProps> = ({
	onClick,
	setShowMenu,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClick(ref, () => setShowMenu(false));

	return (
		<div className={styles.menu} ref={ref}>
			<Button
				text="Odstranit"
				variant={ButtonEnum.transparent}
				onClick={onClick}
			/>
		</div>
	);
};
