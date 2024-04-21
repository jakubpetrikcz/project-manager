import { MouseEvent, ReactNode } from "react";
import classNames from "classnames";

import { IconButton } from "../../atoms";
import { CloseIcon } from "../../ui/icons";

import styles from "./DeleteWrapper.module.scss";

type DeleteWrapperProps = {
	onClick?: () => void;
	element: ReactNode;
	handleRemove: (event: MouseEvent<HTMLButtonElement>) => void;
	showActionButton: boolean;
};

export const DeleteWrapper = ({
	onClick,
	element,
	handleRemove,
	showActionButton,
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
					icon={<CloseIcon color="black" />}
					onClick={handleRemove}
				/>
			)}
		</div>
	);
};
