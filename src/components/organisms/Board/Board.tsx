import BoardHeaderCard from "../../molecules/BoardHeaderCard/BoardHeaderCard";

import styles from "./Board.module.scss";
import { boardCards, boardHeaders } from "../../../constants/cardsArray";
import BoardCard from "../../molecules/BoardCard/BoardCard";

const Board = () => {
	return (
		<div className={styles.board}>
			<div className={styles.header}>
				{boardHeaders.map((header) => (
					<BoardHeaderCard key={header.title} {...header} />
				))}
			</div>
			<div className={styles.content}>
				{boardCards.map((card) => (
					<BoardCard key={card.title} {...card} />
				))}
			</div>
		</div>
	);
};

export default Board;
