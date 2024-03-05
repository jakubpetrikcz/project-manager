import { useState } from "react";
import NavMenu from "../../molecules/NavMenu/NavMenu";

import styles from "./SideBar.module.scss";
import classNames from "classnames";

const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={classNames(styles.sidebar, { [styles.active]: isOpen })}>
			<div className={styles.logoContainer}>
				{isOpen && <h1>Logo</h1>}
				<button onClick={() => setIsOpen(!isOpen)}>x</button>
			</div>
			{isOpen && <NavMenu />}
		</div>
	);
};

export default SideBar;
