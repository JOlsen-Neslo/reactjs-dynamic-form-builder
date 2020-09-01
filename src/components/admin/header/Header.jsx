/**
 * @module Admin Header Component
 * @description
 * Header of each screen in the Administrator Dashboard.
 */
import React from 'react';
import { object } from 'prop-types';

import { ReactComponent as IconSearch } from '../../../images/icon-search.svg';
import { noOp } from '../../../tools/helpers';

import Input from '../../input/Input';
import Avatar from '../../avatar/Avatar';
import Dropdown from '../../dropdown/Dropdown';

import './header.scss';

// Menu that is revealed upon clicking the Avatar
const getProfileMenuItems = (onLogout) => [
  { label: 'My Profile', onClick: noOp },
  { label: 'Settings', onClick: noOp },
  { label: 'Logout', onClick: onLogout },
];

const Header = ({ user, onLogout }) => (
  <div className="header">
    <div className="header__content">
      <div className="header__search">
        <Input
          lighter
          placeholder="Ask a question or start a search"
          suffix={<IconSearch />}
        />
      </div>

      <Dropdown menuItems={getProfileMenuItems(onLogout)}>
        <Avatar name={'Jordan Olsen'} />
      </Dropdown>
    </div>
  </div>
);

Header.propTypes = {
  user: object.isRequired,
};

export default Header;
