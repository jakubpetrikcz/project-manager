import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import { NavLinkType } from "../../../types/navLink";

import styles from "./NavLink.module.scss";

export const NavLink = ({ name, icon, fillIcon, path }: NavLinkType) => {
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
			{active ? fillIcon : icon}
			<p>{name}</p>
		</Link>
	);
};
