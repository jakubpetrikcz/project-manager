export type ProjectsResponse = {
	data: Project[];
}

export type ProjectResponse = {
	data: Project;
}

export type Project = {
	gid: string;
	name: string;
	color: string;
	icon: string;
};