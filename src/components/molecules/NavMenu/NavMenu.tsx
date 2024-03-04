import { menu } from "../../../constants/navLinksArray";
import NavLink from "../../atoms/NavLink/NavLink";

const NavMenu = () => {
	return menu.map((link) => (
		<NavLink
			key={link.name}
			name={link.name}
			icon={link.icon}
			path={link.path}
		/>
	));
};

export default NavMenu;
