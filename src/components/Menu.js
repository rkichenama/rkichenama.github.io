import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes';

const Menu = () => (
  <nav className='cell full text-center'>
    {
      routes
        .filter(route => route['path'])
        .map(({path, title}) => (
          <NavLink key={path.substring(1)} to={path} activeClassName='current'>
            {title}
          </NavLink>
        ))
    }
  </nav>
);

export default Menu;
