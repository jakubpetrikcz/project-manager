import styles from "./BoardCard.module.scss";
import Badge from "../../atoms/Badge/Badge";
import { BadgeEnum } from "../../atoms/Badge/BadgeEnums";

const BoardCard = () => {
	return (
		<div className={styles.card}>
			<img src="/img.png" alt="img" />
			<Badge
				variant={BadgeEnum.error}
				text={"Illustration"}
				className={styles.tag}
			/>
			<div className={styles.description}>
				<div className={styles.text}>
					<h5>Headphone Illustration</h5>
					<p>Illustration for Empty States</p>
				</div>
				<img src="/ellipsis-solid.svg" alt="icon" />
			</div>
		</div>
	);
};

export default BoardCard;
