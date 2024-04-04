import { MouseEvent,useState } from "react";
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
		<Card className={styles.card}>
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
		</Card>
	);
};
