import { useState } from "react";
import { Button } from "../../atoms";
import { PlusIcon } from "../../ui/icons";

import styles from "./TagsPage.module.scss";
import { TagType } from "../../../app/types/task";
import { PageHeader } from "../../molecules";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setVisibility } from "../../../app/features/uiSlice";
import { TagsPageContent } from "../../organisms";

const TagsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [tag, setTag] = useState<TagType>();

	const openTagModal = (item?: TagType) => {
		setTag(item ? item : undefined);
		dispatch(setVisibility({ id: "tagModal", isVisible: true }));
	};

	return (
		<section className={styles.section}>
			<PageHeader title="Tags">
				<Button
					className={styles.button}
					icon={<PlusIcon color="white" />}
					text="Add new tag"
					onClick={() => openTagModal()}
				/>
			</PageHeader>
			<TagsPageContent tag={tag} openTagModal={openTagModal} />
		</section>
	);
};

export default TagsPage;
