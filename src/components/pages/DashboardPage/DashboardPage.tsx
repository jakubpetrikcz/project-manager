import { boardHeaders } from "../../../constants/cardsArray";
import Board from "../../organisms/Board/Board";
import styles from "./DashboardPage.module.scss";

const DashboardPage = () => {
	return (
		<div className={styles.section}>
			<div className={styles.pageHeader}>
				<span>Uvatars Website UI</span>
				<h1>Uvatars Website UI</h1>
			</div>
			<Board />
			{/* <div className={styles.board}>
				{boardHeaders.map((header) => (
					<div key={header.title}>
						{header.title}
						{header.count}
					</div>
				))}
			</div> */}
		</div>
	);
};

export default DashboardPage;
