/**
 * @module Sidebar Component
 * @description
 * A side-menu meant to fill screen height.
 */
import React from 'react';
import {
  arrayOf,
  object,
  shape,
  string,
} from 'prop-types';
import './sidebar.scss';

import { NavLink } from 'react-router-dom';
import { isUndefined } from '../../tools/helpers';

/**
 * Generate a navigation link using `NavLink` - can detect whether
 *  the current page is equal to the link path, and marks it as active.
 */
const renderNavLink = (path, label, icon) => (
  <NavLink exact to={path} className="sidebar__link" activeClassName="sidebar__link--active">
    <div className="sidebar__link-icon">{ icon }</div>
    { label }
  </NavLink>
);

/**
 * When an `onClick` is set instead of a `path`, we render a button instead of a link.
 */
const renderNavAction = (onClick, label, icon) => (
  <button className="sidebar__link" onClick={onClick}>
    <div className="sidebar__link-icon">{ icon }</div>
    { label }
  </button>
);

/**
 * For each `item`, use its name to generate menu items, by referencing
 *  the item's itemLabel and itemIcon.
 * @param {object[]} items - pairs of {name:, path:} used for generating links
 * @param {object} itemLabels - object where the key is the item name, value is the
 *  label to be displayed in the menu
 * @param {object} itemIcons - object where the key is the item name, value is the
 *  icon to be rendered alongside the label
 */
const renderMenuItems = (items = [], itemLabels, itemIcons) => items.map(({ name, path, onClick }) => (
  <li key={name} className="sidebar__menu-item">
    { !isUndefined(path)
      ? renderNavLink(path, itemLabels[name], itemIcons[name])
      : renderNavAction(onClick, itemLabels[name], itemIcons[name]) }
  </li>
));

/** Only render footer items if it exists. */
const renderFooterMenuItems = (footerItems, itemLabels, itemIcons) => footerItems.length > 0 && (
<ul className="sidebar__footer">
  { renderMenuItems(footerItems, itemLabels, itemIcons) }
</ul>
);

const Sidebar = ({
  menuItems, footerItems, itemLabels, itemIcons,
}) => (
  <div className="sidebar">
    <div className="sidebar__header">
        <h6>Logo goes here</h6>
    </div>
    <ul className="sidebar__menu">
      { renderMenuItems(menuItems, itemLabels, itemIcons) }
    </ul>

    { renderFooterMenuItems(footerItems, itemLabels, itemIcons) }
  </div>
);

Sidebar.propTypes = {
  menuItems: arrayOf(shape({
    path: string.isRequired,
    name: string.isRequired,
  })).isRequired,
  footerItems: arrayOf(shape({
    path: string,
    name: string,
  })),
  itemLabels: object.isRequired, // { [name]: string }
  itemIcons: object.isRequired, // { [name]: node }
};

export default Sidebar;
