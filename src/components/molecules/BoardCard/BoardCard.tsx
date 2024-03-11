import { BoardCardModal, ModalWindow } from "..";
import { BoardCardType } from "../../../types/card";
import { Button } from "../../atoms";
import { VerticalDotsIcon } from "../../icons";
import styles from "./BoardCard.module.scss";
import { MouseEvent, useState } from "react";

export const BoardCard: React.FC<BoardCardType> = ({
	title,
	text,
	imgSrc,
	tag,
}) => {
	const [showModal, setShowModal] = useState(false);

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		console.log("ahoj");
	};

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
					<Button
						icon={<VerticalDotsIcon />}
						onClick={(event) => event && openMenu(event)}
						className={styles.icon}
					/>
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
