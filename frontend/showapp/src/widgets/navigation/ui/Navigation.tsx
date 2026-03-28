import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/metrics">metrics</NavLink>
        </li>
        <li>
          <NavLink to="/servers">servers</NavLink>
        </li>
      </ul>
    </nav>
  );
};