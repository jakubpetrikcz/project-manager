import { ReactNode } from "react";

import styles from "./PageHeader.module.scss";

type PageHeaderProps = {
	title?: string;
	children?: ReactNode;
};

export const PageHeader = ({ title, children }: PageHeaderProps) => {
	return (
		<div className={styles.pageHeader}>
			<div className={styles.title}>
				<h1>{title}</h1>
				{children}
			</div>
		</div>
	);
};
