export type TaskResponse = {
	data: Task[];
};

export type SectionResponse = {
	data: Section[];
}

export type AttachmentResponse = {
	data: Attachment[];
}

export type Task = {
	gid?: string;
	memberships: Membership[];
	name: string;
	notes?: string;
	tags?: Tag[];
};

type Membership = {
	section: Section[];
};

export type Section = {
	gid: string;
	name: string;
};

export type Tag = {
	gid: string;
	name: string;
	color: string;
};

type Attachment = {
	gid: string;
	download_url: string;
}
