import styles from "./Board.module.scss";
import { BoardHeaderCard } from "../../molecules";
import { useGetSectionsQuery } from "../../../app/service/tasks";
import { BoardSection } from "../../molecules/BoardSection";

export const Board = () => {
	const {
		data: headers,
		isLoading: isHeadersLoading,
		isError: isHeadersError,
	} = useGetSectionsQuery();

	if (isHeadersLoading) return <div>Loading...</div>;

	if (isHeadersError || !headers) return <div>Error</div>;

	// console.log(headers);

	return (
		<div className={styles.board}>
			<div className={styles.header}>
				{headers.data.map((header) => (
					<BoardHeaderCard
						key={header.gid}
						title={header.name}
						gid={header.gid}
					/>
				))}
			</div>
			<div className={styles.content}>
				{headers.data.map((header) => (
					<BoardSection key={header.gid} gid={header.gid} />
				))}
			</div>
		</div>
	);
};
