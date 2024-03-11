import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./ModalWindow.module.scss";
import classNames from "classnames";
import { CloseIcon } from "../../icons/components";
import { Button } from "../../atoms";

type ModalWindowProps = {
	backgroundImage?: string;
	children: ReactNode;
	close: () => void;
};

export const ModalWindow: React.FC<ModalWindowProps> = ({
	backgroundImage,
	children,
	close,
}) => {
	const modalRoot = document.getElementById("modalRoot");

	return (
		modalRoot &&
		createPortal(
			<div>
				<div className={styles.overlay} onClick={close}></div>
				<div className={styles.modal}>
					<div
						className={classNames(styles.top, {
							[styles.empty]: !backgroundImage,
						})}
					>
						{backgroundImage && (
							<img
								src={backgroundImage}
								alt="img"
								className={styles.backgroundImage}
							/>
						)}
						<Button
							icon={<CloseIcon />}
							onClick={close}
							className={styles.close}
						/>
					</div>
					<div className={styles.bottom}>{children}</div>
				</div>
			</div>,
			modalRoot
		)
	);
};
