import styles from "./BoardCardModal.module.scss";
import { BoardCardType } from "../../../types/card";

const BoardCardModal: React.FC<BoardCardType> = ({ title, text, tag }) => {
	return (
		<div className={styles.content}>
			<div>
				<h3>{title}</h3>
				<p>{text}</p>
			</div>
			{tag}
		</div>
	);
};

export default BoardCardModal;
