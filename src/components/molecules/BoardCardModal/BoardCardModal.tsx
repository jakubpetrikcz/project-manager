import styles from "./BoardCardModal.module.scss";
import { BoardCardType } from "../../../types/card";
import { BadgeType, Tag } from "../../atoms";

export const BoardCardModal: React.FC<BoardCardType> = ({
	title,
	text,
	tags,
}) => {
	return (
		<div className={styles.content}>
			<div>
				<h3>{title}</h3>
				<p>{text}</p>
			</div>
			{tags.map((tag) => (
				<Tag
					key={tag.gid}
					text={tag.name}
					variant={tag.color as BadgeType}
				/>
			))}
		</div>
	);
};
