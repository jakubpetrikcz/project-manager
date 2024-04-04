import { TagType } from "../app/types";

export type BoardCardType = {
	gid: string;
	name: string;
	notes: string;
	imgSrc?: string;
	tags: TagType[];
};
