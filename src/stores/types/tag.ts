import { BadgeTypeEnum } from '../../components/ui';

export type TagResponse = {
	data: TagType[];
};

export type TagType = {
	gid: string;
	name: string;
	color: BadgeTypeEnum;
};
