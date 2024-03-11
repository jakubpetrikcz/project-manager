import { useState } from "react";

import styles from "./SideBar.module.scss";
import classNames from "classnames";
import { LogoContainer, NavMenu } from "../../molecules";

export const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={classNames(styles.sidebar, { [styles.active]: isOpen })}
		>
			<LogoContainer isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && <NavMenu />}
		</div>
	);
};
