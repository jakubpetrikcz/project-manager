import { ReactNode } from "react";

import styles from "./ModalWindow.module.scss";
import classNames from "classnames";
import { CloseIcon } from "../../ui/icons/components";
import { IconButton, Portal } from "../../atoms";

type ModalWindowProps = {
	backgroundImage?: string;
	children: ReactNode;
	close: () => void;
};

export const ModalWindow = ({
	backgroundImage,
	children,
	close,
}: ModalWindowProps) => {
	return (
		<Portal>
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
					<IconButton
						icon={<CloseIcon color="white" />}
						onClick={close}
						className={styles.close}
					/>
				</div>
				<div className={styles.bottom}>{children}</div>
			</div>
		</Portal>
	);
};
