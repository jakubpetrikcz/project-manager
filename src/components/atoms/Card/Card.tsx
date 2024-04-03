import { ReactNode, DragEvent } from "react";

import styles from "./Card.module.scss";
import classNames from "classnames";

type CardProps = {
	className?: string;
	draggable?: boolean;
	onDragStart?: (event: DragEvent<HTMLDivElement>) => void;
	onClick?: () => void;
	children: ReactNode;
};

export const Card = ({
	className,
	draggable = false,
	onDragStart,
	onClick,
	children,
}: CardProps) => {
	return (
		<div
			className={classNames(styles.card, className)}
			draggable={draggable}
			onDragStart={onDragStart}
			onClick={onClick}
		>
			{children}
		</div>
	);
};
