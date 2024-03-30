import { useState, MouseEvent } from "react";
import {
	useDeleteTagMutation,
	useGetTagsQuery,
} from "../../../app/service/tagsApi";
import { Button, IconButton, Tag } from "../../atoms";
import { CloseIcon, PlusIcon } from "../../icons";
import { TagModal } from "../../molecules/TagModal";

import styles from "./TagsPage.module.scss";
import { TagType } from "../../../app/types/task";

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
			<div className={styles.pageHeader}>
				<span>Uvatars Website UI</span>
				<div className={styles.title}>
					<h1>Tags</h1>
					<Button
						className={styles.button}
						icon={<PlusIcon color="white" />}
						text="Add new tag"
						onClick={() => openTagModal()}
					/>
				</div>
			</div>
			<div className={styles.container}>
				{data?.data.map((item) => (
					<div
						key={item.gid}
						className={styles.tagContainer}
						onClick={() => openTagModal(item)}
					>
						<IconButton
							className={styles.close}
							icon={<CloseIcon color="black" />}
							onClick={(event) => handleDelete(item.gid, event)}
						/>
						<Tag text={item.name} variant={item.color} />
					</div>
				))}
			</div>
			{isTagModalVisible && (
				<TagModal tag={tag} close={() => setIsTagModalVisible(false)} />
			)}
		</div>
	);
};

export default TagsPage;
