/**
 * @module Tabs Component
 * @description
 * A grouped set of menu items, each of which can be selected.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  func,
  node,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';

import {
  getClassNames,
  isEmpty,
} from '../../tools/helpers';

import Checkbox from '../checkbox/Checkbox';

import './tabs.scss';

// render a completed indicator
const renderTabCompleteIndicator = (complete, checkbox) => {
  if (checkbox) {
    return (
      <div className="tab__indicator">
        <Checkbox checked={complete} readOnly />
      </div>
    );
  }

  return complete && (
    <div className="tab__indicator">
      <Checkbox checked readOnly />
    </div>
  );
};

/**
 * Loops through all `items` and renders them as list items.
 * @param {object[]} items - tab items
 * @param {number} activeItem - index of the active tab item
 * @param {function} onClickItem - function to trigger on click
 */
const renderItems = (items, activeItem, onClickItem, checkbox) => items.map((item, index) => (
  <li
    key={index}
    className={getClassNames('tabs__tab', { active: index === activeItem, complete: item.complete })}
    onClick={() => onClickItem(index)}
  >
    { renderTabCompleteIndicator(item.complete, checkbox) }
    <p className="tab__label">{ item.label }</p>
  </li>
));

/** Renders links adjacent to the tabs, if any. */
const renderLinks = (links) => !isEmpty(links) && (
<ul className="tabs__link-container">
  { links.map((link, index) => (
    <li
      key={index}
      className="tabs__link"
      onClick={link.onClick}
    >
      <p className="tab__label typo-small-title">{ link.label }</p>
    </li>
  )) }
</ul>
);

const Tabs = ({
  items, links, activeItem, onClickItem, checkbox, small,
}) => (
  <div className={getClassNames('tabs', { checkbox, small, 'with-links': !isEmpty(links) })}>
    <ul className="tabs__container">
      { renderItems(items, activeItem, onClickItem, checkbox) }
    </ul>

    { renderLinks(links) }
  </div>
);

Tabs.defaultProps = {
  items: [],
  activeItem: 0,
  checkbox: false,
  small: false,
  links: [],
};

Tabs.propTypes = {
  items: arrayOf(shape({
    label: oneOfType([string, node]).isRequired,
  })),
  activeItem: number,
  onClickItem: func.isRequired,
  checkbox: bool,
  small: bool,
  links: arrayOf(shape({
    label: string,
    onClick: func,
  })),
};

export default Tabs;
