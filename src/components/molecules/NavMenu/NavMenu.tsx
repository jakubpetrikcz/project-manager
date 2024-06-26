import { menu } from "../../../constants/navLinksArray";
import { NavLink } from "../../atoms";

import styles from "./NavMenu.module.scss";

export const NavMenu = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{menu.map((link) => (
					<li key={link.name}>
						<NavLink key={link.name} {...link} />
					</li>
				))}
			</ul>
		</nav>
	);
};
