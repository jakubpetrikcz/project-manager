import { useState } from "react";
import { useDispatch } from "react-redux";

import { setVisibility } from "../../../app/features/uiSlice";
import { AppDispatch } from "../../../app/store";
import { TagType } from "../../../app/types";
import { Button } from "../../atoms";
import { PageHeader } from "../../molecules";
import { TagsPageContent } from "../../organisms";
import { PlusIcon } from "../../ui/icons";

import styles from "./TagsPage.module.scss";

export const TagsPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [tag, setTag] = useState<TagType>();

	const openTagModal = (tag?: TagType) => {
		setTag(tag ? tag : undefined);
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
