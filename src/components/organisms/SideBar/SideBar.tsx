import { useState } from "react";
import NavMenu from "../../molecules/NavMenu/NavMenu";

import styles from "./SideBar.module.scss";
import classNames from "classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "../../icons/components";
import IconButton from "../../atoms/IconButton/IconButton";

const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={classNames(styles.sidebar, { [styles.active]: isOpen })}
		>
			<div className={styles.logoContainer}>
				{isOpen && <img src="/logo.svg" alt="logo" />}
				<IconButton
					icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>
			{isOpen && <NavMenu />}
		</div>
	);
};

export default SideBar;
