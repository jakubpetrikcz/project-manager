import React, { useState, MouseEvent } from "react";

import styles from "./BoardHeaderCard.module.scss";
import { BoardHeaderType } from "../../../types/card";
import { HorizontalDotsIcon } from "../../icons";
import { Badge, Button } from "../../atoms";
import {
	useGetTasksQuery,
	useUpdateSectionMutation,
} from "../../../app/service/tasks";
import { EditableText } from "../EditableText";
import { OptionMenu } from "..";

export const BoardHeaderCard: React.FC<BoardHeaderType> = ({ gid, title }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(title);

	const { data, isLoading, isError } = useGetTasksQuery(gid);
	const [updateSection] = useUpdateSectionMutation();

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) return <div>Error</div>;

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setShowMenu(true);
	};

	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<EditableText
					isEditing={isEditing}
					setIsEditing={setIsEditing}
					text={text}
					setText={setText}
					updateText={() =>
						updateSection({
							sectionGid: gid,
							name: text || "Untitled section",
						})
					}
				/>
				<Badge text={data.data.length} />
			</div>
			<div className={styles.right}>
				<Button
					icon={<HorizontalDotsIcon />}
					onClick={(event) => event && openMenu(event)}
					className={styles.icon}
				/>
				{showMenu && (
					<OptionMenu
						onClick={() => {
							setIsEditing(true);
							updateSection({
								sectionGid: gid,
								name: text || "Untitled section",
							});
							setShowMenu(false)
						}}
						setShowMenu={setShowMenu}
					/>
				)}
			</div>
		</div>
	);
};
