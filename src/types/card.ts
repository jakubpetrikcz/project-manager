import { ReactNode } from "react";

export type BoardHeaderType = {
	title: string;
	count: number;
};

export type BoardCardType = {
	title: string;
	text: string;
	imgSrc?: string;
	tag: ReactNode;
}
