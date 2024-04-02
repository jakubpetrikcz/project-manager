import React from "react";

import styles from "./LogoContainer.module.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "../../ui/icons/components";
import { MenuButton } from "../../atoms";

type LogoContainerProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LogoContainer = ({ isOpen, setIsOpen }: LogoContainerProps) => {
	return (
		<div className={styles.logoContainer}>
			{isOpen && <img src="/logo.svg" alt="logo" />}
			<MenuButton
				icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				onClick={() => setIsOpen(!isOpen)}
			/>
		</div>
	);
};
