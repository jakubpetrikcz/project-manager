import { MouseEvent, ReactNode } from "react";

import styles from "./RemovableComponent.module.scss";
import { IconButton } from "../../atoms";
import { CloseIcon } from "../../ui/icons";
import classNames from "classnames";

type RemovableComponentProps = {
	onClick?: () => void;
	element: ReactNode;
	handleRemove: (event?: MouseEvent<HTMLButtonElement>) => void;
	showActionButton: boolean;
};

export const RemovableComponent = ({
	onClick,
	element,
	handleRemove,
	showActionButton,
}: RemovableComponentProps) => {
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
