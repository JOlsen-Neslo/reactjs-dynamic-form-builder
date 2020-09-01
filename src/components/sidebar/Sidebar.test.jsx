import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  let component;

  beforeEach(() => {
    component = render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar
          menuItems={[
            { name: 'home', path: '/home' },
            { name: 'admin', path: '/admin' },
            { name: 'agents', path: '/agents' },
          ]}
          footerItems={[
            { name: 'logout', path: '/logout' },
          ]}
          itemLabels={{
            home: 'HOME',
            admin: 'Admin Page',
            agents: 'Agent Dashboard',
            logout: 'Logout',
          }}
          itemIcons={{
            home: <img src="home-img" />,
            admin: <img src="admin-img" />,
            agents: <img src="agents-img" />,
            logout: <img src="logout-img" />,
          }}
        />
      </MemoryRouter>,
    );
  });

  test('should render the menu labels correctly', () => {
    const { container, getByText } = component;

    const menuItems = container.querySelectorAll('.sidebar__menu-item');

    // number of menu items
    expect(menuItems.length).toEqual(4);

    // each menu item label exists
    expect(getByText('HOME')).toBeInTheDocument();
    expect(getByText('Admin Page')).toBeInTheDocument();
    expect(getByText('Agent Dashboard')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });
});
