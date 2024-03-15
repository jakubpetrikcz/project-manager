export type BoardHeaderType = {
	gid?: string;
	title: string;
	count?: string;
};

export type BoardCardType = {
	title: string;
	text: string;
	imgSrc?: string;
	tags: [
		{
			color: string;
			gid: string;
			name: string;
		}
	];
};
