import { useState } from "react";
import NavMenu from "../../molecules/NavMenu/NavMenu";

import styles from "./SideBar.module.scss";
import classNames from "classnames";
import LogoContainer from "../../molecules/LogoContainer/LogoContainer";

const SideBar = () => {
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

export default SideBar;
