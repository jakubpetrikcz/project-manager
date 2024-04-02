import { HouseIcon } from "../components/ui/icons/components";
import { NavLinkType } from "../types/navLink";

export const menu: NavLinkType[] = [
	{
		name: "Dashboard",
		icon: <HouseIcon />,
		path: "/",
	},
	{
		name: "My Tags",
		icon: <HouseIcon />,
		path: "/tags",
	},
];
