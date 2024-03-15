import { Tag } from "../components/atoms";
import { BadgeEnum } from "../components/atoms/Badge/BadgeTypes";
import { BoardCardType, BoardHeaderType } from "../types/card";

export const boardHeaders: BoardHeaderType[] = [
	{
		title: "Open",
		count: 8,
	},
	{
		title: "To do",
		count: 8,
	},
	{
		title: "In work",
		count: 8,
	},
	{
		title: "Review",
		count: 8,
	},
];

// export const boardCards: BoardCardType[] = [
// 	{
// 		title: "Headphone Illustration",
// 		text: "Illustration for Empty States",
// 		imgSrc: "/img.png",
// 		tag: <Tag text="Illustration" variant={BadgeEnum.error} />,
// 	},
// 	{
// 		title: "UI Design Mobile App",
// 		text: "Cinema App UI design in figma",
// 		tag: <Tag text="UI Design" variant={BadgeEnum.success} />,
// 	},
// ];
