import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'navigation__link navigation__link--active' : 'navigation__link'
            }
          >
            home
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            to="/metrics"
            className={({ isActive }) =>
              isActive ? 'navigation__link navigation__link--active' : 'navigation__link'
            }
          >
            metrics
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            to="/servers"
            className={({ isActive }) =>
              isActive ? 'navigation__link navigation__link--active' : 'navigation__link'
            }
          >
            servers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};