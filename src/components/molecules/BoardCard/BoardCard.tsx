import styles from "./BoardCard.module.scss";
import { useState } from "react";
import BoardCardModal from "../BoardCardModal/BoardCardModal";
import ModalWindow from "../ModalWindow/ModalWindow";
import { BoardCardType } from "../../../types/card";

const BoardCard: React.FC<BoardCardType> = ({ title, text, imgSrc, tag }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className={styles.card} onClick={() => setShowModal(true)}>
				{imgSrc && (
					<img
						src={imgSrc}
						alt="img"
						className={styles.backgroundImage}
					/>
				)}
				{tag}
				<div className={styles.description}>
					<div className={styles.text}>
						<h5>{title}</h5>
						<p>{text}</p>
					</div>
					<img src="/ellipsis-vertical-solid.svg" alt="icon" />
				</div>
			</div>
			{showModal && (
				<ModalWindow
					backgroundImage={imgSrc}
					close={() => setShowModal(false)}
				>
					<BoardCardModal title={title} text={text} tag={tag} />
				</ModalWindow>
			)}
		</>
	);
};

export default BoardCard;
