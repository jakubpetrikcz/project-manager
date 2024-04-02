import { PageHeader } from "../../molecules";
import { Board } from "../../organisms";
import styles from "./DashboardPage.module.scss";

const DashboardPage = () => {
	return (
		<div className={styles.section}>
			<PageHeader title="Uvatars Website UI" />
			<Board />
		</div>
	);
};

export default DashboardPage;
