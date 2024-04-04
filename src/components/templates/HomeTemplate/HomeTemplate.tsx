import { Outlet } from "react-router-dom";

import { SideBar } from "../../organisms";

import styles from "./HomeTemplate.module.scss";

export const HomeTemplate = () => {
	return (
		<div className={styles.container}>
			<SideBar />
			<Outlet />
		</div>
	);
};
