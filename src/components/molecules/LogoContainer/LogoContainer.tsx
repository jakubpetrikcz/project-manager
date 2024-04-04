import { Dispatch, SetStateAction } from "react";

import { MenuButton } from "../../atoms";
import { ArrowLeftIcon, ArrowRightIcon } from "../../ui/icons/components";

import styles from "./LogoContainer.module.scss";

type LogoContainerProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
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
