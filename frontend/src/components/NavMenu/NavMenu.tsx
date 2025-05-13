import { menu } from '../../constants/navLinksArray';
import { NavLink } from '../ui';

export const NavMenu = () => {
	return (
		<nav>
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
