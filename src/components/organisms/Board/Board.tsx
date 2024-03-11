import styles from "./Board.module.scss";
import { boardCards, boardHeaders } from "../../../constants/cardsArray";
import { BoardCard, BoardHeaderCard } from "../../molecules";

export const Board = () => {
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
