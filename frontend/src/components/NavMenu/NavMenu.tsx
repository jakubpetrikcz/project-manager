import { menu } from '../../constants/navLinksArray';
import { NavItem } from '../ui';

export const NavMenu = () => {
  return (
    <nav>
      <ul>
        {menu.map((link) => (
          <li key={link.name}>
            <NavItem key={link.name} {...link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
