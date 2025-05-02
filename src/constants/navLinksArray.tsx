import { HouseFillIcon, HouseIcon, TagFillIcon, TagIcon } from "../components/icons/components";
import { NavLinkType } from "../types/navLink";

export const menu: NavLinkType[] = [
	{
		name: "Dashboard",
		icon: <HouseIcon />,
		fillIcon: <HouseFillIcon />,
		path: "/",
	},
	{
		name: "My Tags",
		icon: <TagIcon />,
		fillIcon: <TagFillIcon />,
		path: "/tags",
	},
];
