import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { setVisibility } from "../../../app/features/uiSlice";
import { useUpdateSectionMutation } from "../../../app/service/sectionsApi";
import { useGetTasksQuery } from "../../../app/service/tasksApi";
import { AppDispatch } from "../../../app/store";
import { Badge, Button, ButtonEnum, Card, IconButton } from "../../atoms";
import { HorizontalDotsIcon } from "../../ui/icons";
import { EditableText, OptionMenu } from "..";

import styles from "./BoardSectionHeader.module.scss";

type BoardSectionHeaderProps = {
	gid: string;
	title: string;
};

export const BoardHeaderSection = ({ gid, title }: BoardSectionHeaderProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const [showMenu, setShowMenu] = useState(false);
	const { data, isLoading, isError } = useGetTasksQuery(gid);
	const [updateSection] = useUpdateSectionMutation();

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) return <div>Error</div>;

	const handleUpdateSection = (text: string) => {
		updateSection({
			gid,
			name: text || "Untitled section",
		});
	};

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setShowMenu(true);
	};

	const handleRenameClick = () => {
		dispatch(setVisibility({ id: `editHeader-${gid}`, isVisible: true }));
		setShowMenu(false);
	};

	return (
		<Card className={styles.card}>
			<div className={styles.left}>
				<EditableText
					gid={`editHeader-${gid}`}
					value={title}
					updateText={(text) => handleUpdateSection(text)}
					emptyText="Untitled section"
				>
					<span className={styles.text}>
						{title || "Untitled section"}
					</span>
				</EditableText>
				<Badge text={data.data.length.toString()} />
			</div>
			<div className={styles.right}>
				<IconButton
					icon={<HorizontalDotsIcon />}
					onClick={openMenu}
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
		</Card>
	);
};
