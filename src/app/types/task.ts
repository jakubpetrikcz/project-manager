import { BadgeType } from "../../components/atoms";

// TODO: Lépe zorganizovat typy -> rozdělit do samostatných souborů
export type TaskResponse = {
	data: Task[];
};

export type createTaskResponse = {
	data: Task;
}

export type SectionResponse = {
	data: Section[];
}

export type AttachmentResponse = {
	data: Attachment[];
}

export type Task = {
	gid: string;
	memberships: Membership[];
	name: string;
	notes: string;
	tags: TagType[];
};

type Membership = {
	section: Section[];
};

export type Section = {
	gid: string;
	name: string;
};

export type TagResponse = {
	data: TagType[]
}

export type TagType = {
	gid: string;
	name: string;
	color: BadgeType;
};

type Attachment = {
	gid: string;
	download_url: string;
}
