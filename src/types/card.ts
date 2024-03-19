import { Tag } from "../app/types/task";

export type BoardHeaderType = {
	gid: string;
	title: string;
	count?: string;
};

export type BoardCardType = {
	gid: string;
	title: string;
	text: string;
	imgSrc?: string;
	tags: Tag[];
};
