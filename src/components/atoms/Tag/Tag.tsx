import styles from "./Tag.module.scss";
import { Badge, BadgeProps } from "../Badge";

export const Tag = ({ text, variant }: BadgeProps) => {
	return <Badge text={text} variant={variant} className={styles.tag} />;
};
