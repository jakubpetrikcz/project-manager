import { Section } from "../../../stores/types/section";
import { TagType } from "../../../stores/types/tag";

export type TaskResponse = {
	data: Task[];
};

export type CreateTaskResponse = {
	data: Task;
};

export type AttachmentResponse = {
	data: Attachment[];
};

export type TaskTagArgs = {
	taskGid: string;
	tagGid: string;
};

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

type Attachment = {
	gid: string;
	download_url: string;
};
