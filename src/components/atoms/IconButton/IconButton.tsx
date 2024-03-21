import React, { ReactNode, MouseEvent } from "react";

import styles from "./IconButton.module.scss";
import classNames from "classnames";

type IconButtonProps = {
	icon: ReactNode;
	onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
	className?: string;
};

export const IconButton: React.FC<IconButtonProps> = ({
	icon,
	onClick,
	className,
}) => {
	return (
		<button
			className={classNames(styles.icon, className)}
			onClick={onClick}
		>
			{icon}
		</button>
	);
};
