import BoardHeaderCard from "../../molecules/BoardHeaderCard/BoardHeaderCard";

import styles from "./Board.module.scss";
import { boardHeaders } from "../../../constants/cardsArray";

const Board = () => {
	return (
		<div className={styles.board}>
			<div className={styles.header}>
				{boardHeaders.map((header) => (
					<BoardHeaderCard {...header} />
				))}
			</div>
		</div>
	);
};

export default Board;
