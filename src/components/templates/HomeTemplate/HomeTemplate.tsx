import SideBar from "../../organisms/SideBar/SideBar";
import { Outlet } from "react-router-dom";

import styles from "./HomeTemplate.module.scss";

const HomeTemplate = () => {
	return (
		<div className={styles.container}>
			<SideBar />
			<Outlet />
		</div>
	);
};

export default HomeTemplate;
