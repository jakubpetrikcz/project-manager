import React, { useEffect, useState } from "react";
import { NavLinkType } from "../../../types/navLink";
import { Link, useLocation } from "react-router-dom";

import styles from "./NavLink.module.scss";
import classNames from "classnames";

export const NavLink: React.FC<NavLinkType> = ({ name, icon, path }) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (pathname === path) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [path, pathname]);

	return (
		<Link
			to={path}
			className={classNames(styles.link, { [styles.active]: active })}
		>
			{icon}
			<p>{name}</p>
		</Link>
	);
};
