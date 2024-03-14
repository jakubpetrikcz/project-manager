export type BoardHeaderType = {
	title: string;
	count: number;
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
