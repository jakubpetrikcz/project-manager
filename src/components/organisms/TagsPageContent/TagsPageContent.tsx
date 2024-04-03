import { MouseEvent } from "react";

import styles from "./TagsPageContent.module.scss";
import {
	useDeleteTagMutation,
	useGetTagsQuery,
} from "../../../app/service/tagsApi";
import { RemovableComponent, TagModal } from "../../molecules";
import { Tag } from "../../atoms";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setVisibility } from "../../../app/features/uiSlice";
import { TagType } from "../../../app/types/task";

type TagsPageContentProps = {
	tag?: TagType;
	openTagModal: (item?: TagType) => void;
};

export const TagsPageContent = ({
	tag,
	openTagModal,
}: TagsPageContentProps) => {
	const { data, isLoading, isError } = useGetTagsQuery();
	const dispatch = useDispatch<AppDispatch>();
	const isModalVisible = useSelector(
		(state: RootState) => state.ui.visibility["tagModal"]
	);

	const [deleteTag] = useDeleteTagMutation();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	const handleDelete = (
		gid: string,
		event?: MouseEvent<HTMLButtonElement>
	) => {
		event?.stopPropagation();
		deleteTag(gid);
	};

	return (
		<>
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
			{isModalVisible && (
				<TagModal
					tag={tag}
					close={() =>
						dispatch(
							setVisibility({ id: "tagModal", isVisible: false })
						)
					}
				/>
			)}
		</>
	);
};
