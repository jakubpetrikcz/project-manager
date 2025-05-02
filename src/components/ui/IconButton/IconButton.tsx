import { MouseEvent, ReactNode } from "react";
import classNames from "classnames";

import styles from "./IconButton.module.scss";

type IconButtonProps = {
	icon: ReactNode;
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
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
