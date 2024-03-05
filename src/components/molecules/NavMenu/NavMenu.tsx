import { menu } from "../../../constants/navLinksArray";
import NavLink from "../../atoms/NavLink/NavLink";

import styles from "./NavMenu.module.scss";

const NavMenu = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{menu.map((link) => (
					<li key={link.name}>
						<NavLink
							key={link.name}
							name={link.name}
							icon={link.icon}
							path={link.path}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavMenu;
