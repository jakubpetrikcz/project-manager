import { useState } from "react";
import NavMenu from "../../molecules/NavMenu/NavMenu";

import styles from "./SideBar.module.scss";
import classNames from "classnames";
import Button from "../../atoms/Button/Button";

const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={classNames(styles.sidebar, { [styles.active]: isOpen })}
		>
			<div className={styles.logoContainer}>
				{isOpen && <h1>Logo</h1>}
				<Button icon={isOpen ? "/arrow-left.svg" : "/arrow-right.svg"} onClick={() => setIsOpen(!isOpen)} />
			</div>
			{isOpen && <NavMenu />}
		</div>
	);
};

export default SideBar;
