import React from "react";

import styles from "./LogoContainer.module.scss";
import IconButton from "../../atoms/IconButton/IconButton";
import { ArrowLeftIcon, ArrowRightIcon } from "../../icons/components";

type LogoContainerProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoContainer: React.FC<LogoContainerProps> = ({ isOpen, setIsOpen }) => {
	return (
		<div className={styles.logoContainer}>
			{isOpen && <img src="/logo.svg" alt="logo" />}
			<IconButton
				icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				onClick={() => setIsOpen(!isOpen)}
			/>
		</div>
	);
};

export default LogoContainer;
