/**
 * @module DropdownMenu Component
 * @description
 * Utilised by `Dropdown` to display a menu.
 */
import React from 'react';
import {
  arrayOf,
  shape,
  func,
  string,
  bool,
  oneOfType,
  node,
} from 'prop-types';
import './dropdownMenu.scss';
import { getClassNames } from '../../tools/helpers';

/**
 * Renders each menu item. Uses a button instead of links for more general use.
 *  (links have to contain hrefs).
 *
 * @param {Object[]} menuItems - list of {label:, onClick:} pairs
 */
const renderMenuItems = (menuItems) => menuItems.map(({ label, onClick, selected }, index) => {
  const itemClassNames = getClassNames('dropdown-menu__item', { selected });

  return (
    <li key={index} className={itemClassNames}>
      <div className="dropdown-menu__item-content">
        <button type="button" onClick={onClick}>{label}</button>
      </div>
    </li>
  );
});

const DropdownMenu = ({
  menuItems, minimal, select, narrow,
}) => (
  <ul className={getClassNames('dropdown-menu', { select, minimal, narrow })}>
    {renderMenuItems(menuItems)}
  </ul>
);

DropdownMenu.defaultProps = {
  minimal: false,
  select: false,
  narrow: false,
};

DropdownMenu.propTypes = {
  menuItems: arrayOf(shape({
    label: oneOfType([string, node]).isRequired,
    onClick: func,
  })).isRequired,
  minimal: bool,
  select: bool,
  narrow: bool,
};

export default DropdownMenu;
