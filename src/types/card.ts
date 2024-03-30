import { TagType } from "../app/types/task";

export type BoardHeaderType = {
	gid: string;
	title: string;
	count?: string;
};

export type BoardCardType = {
	gid: string;
	name: string;
	notes: string;
	imgSrc?: string;
	tags: TagType[];
};
