import { PageHeader } from "../../molecules";
import { Board } from "../../templates";

import styles from "./DashboardPage.module.scss";

export const DashboardPage = () => {
	return (
		<section className={styles.section}>
			<PageHeader title="Uvatars Website UI" />
			<Board />
		</section>
	);
};
