import { useState, MouseEvent } from "react";

import styles from "./BoardHeaderCard.module.scss";
import { BoardHeaderType } from "../../../types/card";
import { HorizontalDotsIcon } from "../../ui/icons";
import { Badge, Button, ButtonEnum, IconButton } from "../../atoms";
import { useGetTasksQuery } from "../../../app/service/tasksApi";
import { EditableText, OptionMenu } from "..";
import { useUpdateSectionMutation } from "../../../app/service/sectionsApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setVisibility } from "../../../app/features/uiSlice";

export const BoardHeaderCard = ({ gid, title }: BoardHeaderType) => {
	const dispatch = useDispatch<AppDispatch>();

	const [showMenu, setShowMenu] = useState(false);
	const [text, setText] = useState(title);

	const { data, isLoading, isError } = useGetTasksQuery(gid);
	const [updateSection] = useUpdateSectionMutation();

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) return <div>Error</div>;

	const handleUpdateSection = () => {
		updateSection({
			gid,
			name: text || "Untitled section",
		});
	};

	const openMenu = (event?: MouseEvent<HTMLButtonElement>) => {
		event?.stopPropagation();
		setShowMenu(true);
	};

	const handleRenameClick = () => {
		dispatch(setVisibility({ id: gid, isVisible: true }));
		setShowMenu(false);
	};

	return (
		<div className={styles.card}>
			<div className={styles.left}>
				<EditableText
					gid={`editHeader-${gid}`}
					text={text}
					setText={setText}
					updateText={handleUpdateSection}
					emptyText="Untitled section"
				>
					<span className={styles.text}>
						{text || "Untitled section"}
					</span>
				</EditableText>
				<Badge text={data.data.length.toString()} />
			</div>
			<div className={styles.right}>
				<IconButton
					icon={<HorizontalDotsIcon />}
					onClick={(event) => openMenu(event)}
					className={styles.icon}
				/>
				{showMenu && (
					<OptionMenu setShowMenu={setShowMenu}>
						<Button
							text="Přejmenovat"
							variant={ButtonEnum.transparent}
							onClick={handleRenameClick}
						/>
					</OptionMenu>
				)}
			</div>
		</div>
	);
};
