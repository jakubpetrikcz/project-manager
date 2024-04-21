import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setVisibility } from "../../../app/features/uiSlice";
import {
	useDeleteTagMutation,
	useGetTagsQuery,
} from "../../../app/service/tagsApi";
import { AppDispatch, RootState } from "../../../app/store";
import { TagType } from "../../../app/types";
import { Tag } from "../../atoms";
import { DeleteWrapper, TagModal } from "../../molecules";

import styles from "./TagsPageContent.module.scss";

type TagsPageContentProps = {
	tag?: TagType;
	openTagModal: (item?: TagType) => void;
};

export const TagsPageContent = ({
	tag,
	openTagModal,
}: TagsPageContentProps) => {
	const { data: tags, isLoading, isError } = useGetTagsQuery();
	const dispatch = useDispatch<AppDispatch>();
	const isModalVisible = useSelector(
		(state: RootState) => state.ui.visibility["tagModal"]
	);

	const [deleteTag] = useDeleteTagMutation();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	const handleDelete = (
		gid: string,
		event: MouseEvent<HTMLButtonElement>
	) => {
		event.stopPropagation();
		deleteTag(gid);
	};

	return (
		<>
			<div className={styles.container}>
				{tags?.data.map((tag) => (
					<DeleteWrapper
						key={tag.gid}
						onClick={() => openTagModal(tag)}
						element={<Tag text={tag.name} variant={tag.color} />}
						handleRemove={(event) => handleDelete(tag.gid, event)}
						showActionButton={!!tag}
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
