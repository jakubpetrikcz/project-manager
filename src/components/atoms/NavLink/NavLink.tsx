import React from "react";
import { NavLinkType } from "../../../types/navLink";
import { Link } from "react-router-dom";

const NavLink: React.FC<NavLinkType> = ({ name, icon, path }) => {
	return (
		<Link to={path}>
			{icon}
			<p>{name}</p>
		</Link>
	);
};

export default NavLink;
