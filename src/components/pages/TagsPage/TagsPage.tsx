import { useState, MouseEvent } from "react";
import {
	useDeleteTagMutation,
	useGetTagsQuery,
} from "../../../app/service/tagsApi";
import { Button, Tag } from "../../atoms";
import { PlusIcon } from "../../ui/icons";
import { TagModal } from "../../molecules/TagModal";

import styles from "./TagsPage.module.scss";
import { TagType } from "../../../app/types/task";
import { PageHeader, RemovableComponent } from "../../molecules";

const TagsPage = () => {
	const { data, isLoading, isError } = useGetTagsQuery();
	const [deleteTag] = useDeleteTagMutation();
	const [isTagModalVisible, setIsTagModalVisible] = useState(false);
	const [tag, setTag] = useState<TagType>();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	const handleDelete = (
		gid: string,
		event?: MouseEvent<HTMLButtonElement>
	) => {
		event?.stopPropagation();
		deleteTag(gid);
	};

	const openTagModal = (item?: TagType) => {
		setTag(item ? item : undefined);
		setIsTagModalVisible(true);
	};

	return (
		<div className={styles.section}>
			<PageHeader title="Tags">
				<Button
					className={styles.button}
					icon={<PlusIcon color="white" />}
					text="Add new tag"
					onClick={() => openTagModal()}
				/>
			</PageHeader>
			<div className={styles.container}>
				{data?.data.map((item) => (
					<RemovableComponent
						key={item.gid}
						onClick={() => openTagModal(item)}
						element={<Tag text={item.name} variant={item.color} />}
						handleRemove={(event) => handleDelete(item.gid, event)}
						showActionButton={!!item}
					/>
				))}
			</div>
			{isTagModalVisible && (
				<TagModal tag={tag} close={() => setIsTagModalVisible(false)} />
			)}
		</div>
	);
};

export default TagsPage;
