import { useState } from "react";
import { useGetTagsQuery } from "../../../app/service/tagsApi";
import { Button, Tag } from "../../atoms";
import { PlusIcon } from "../../icons";
import { TagModal } from "../../molecules/TagModal";

import styles from "./TagsPage.module.scss";

const TagsPage = () => {
	const { data, isLoading, isError } = useGetTagsQuery();
	const [isTagModalVisible, setIsTagModalVisible] = useState(false);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	console.log(data);

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
						onClick={() => setIsTagModalVisible(true)}
					/>
				</div>
			</div>
			<div className={styles.container}>
				{data?.data.map((item) => (
					<Tag key={item.gid} text={item.name} variant={item.color} />
				))}
			</div>
			{isTagModalVisible && (
				<TagModal close={() => setIsTagModalVisible(false)} />
			)}
		</div>
	);
};

export default TagsPage;
