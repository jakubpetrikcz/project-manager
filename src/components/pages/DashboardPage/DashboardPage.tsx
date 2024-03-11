import { Board } from "../../organisms";
import styles from "./DashboardPage.module.scss";

const DashboardPage = () => {
	return (
		<div className={styles.section}>
			<div className={styles.pageHeader}>
				<span>Uvatars Website UI</span>
				<h1>Uvatars Website UI</h1>
			</div>
			<Board />
		</div>
	);
};

export default DashboardPage;
