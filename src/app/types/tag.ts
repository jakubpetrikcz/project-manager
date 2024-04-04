import { BadgeTypeEnum } from "../../components/atoms";

export type TagResponse = {
	data: TagType[]
}

export type TagType = {
	gid: string;
	name: string;
	color: BadgeTypeEnum;
};