import { ReactNode, MouseEvent } from "react";

import styles from "./IconButton.module.scss";
import classNames from "classnames";

type IconButtonProps = {
	icon: ReactNode;
	onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
	className?: string;
};

export const IconButton = ({ icon, onClick, className }: IconButtonProps) => {
	return (
		<button
			className={classNames(styles.icon, className)}
			onClick={onClick}
		>
			{icon}
		</button>
	);
};
