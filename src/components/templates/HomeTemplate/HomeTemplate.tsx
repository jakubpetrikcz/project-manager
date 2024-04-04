import { Outlet } from "react-router-dom";

import styles from "./HomeTemplate.module.scss";
import { SideBar } from "../../organisms";

export const HomeTemplate = () => {
	return (
		<div className={styles.container}>
			<SideBar />
			<Outlet />
		</div>
	);
};
