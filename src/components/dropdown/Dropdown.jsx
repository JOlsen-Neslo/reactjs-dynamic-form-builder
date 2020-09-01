/**
 * @module Dropdown Component
 * @description
 * Wrapper around PopperJS (https://github.com/popperjs/react-popper), the element
 *  positioning library.
 * Will accept `children` that serve as the trigger element.
 * The popper element is the `DropdownMenu` component, constructed from provided
 *  `menuItems`, and is visible upon clicking the trigger element.
 */
import React, {
  useEffect,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
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
  isUndefined,
  noOp,
} from '../../tools/helpers';

import DropdownMenu from './DropdownMenu';

import './dropdown.scss';

/**
 * Popper options setup with placement and offset (menu distance from trigger).
 *
 * @param {String} placement - where to place the popper, relative to trigger
 *  ('top', 'top-start', 'bottom-end', 'left', 'right', etc.)
 */
const getPopperOptions = (placement, yOffset) => ({
  placement,
  modifiers: [{
    name: 'offset',
    options: {
      offset: [0, yOffset],
    },
  }],
});

/**
 * Decide whether to display the overlay, based on `popperOpen`. Will
 *  hide the popper menu if clicked.
 *
 * @param {Boolean} popperOpen - state of whether the popper menu is visible
 * @param {Function} handleOpenPopper - function to set value of popperOpen
 */
const renderOverlay = (popperOpen, handleOpenPopper) => popperOpen && (
<div className="dropdown__overlay" onClick={() => handleOpenPopper(false)} />
);

const renderPopperElement = (menu, menuItems) => menu || <DropdownMenu menuItems={menuItems} />;

const Dropdown = ({
  menu,
  menuItems,
  placement,
  expandPopper,
  onOpenPopper,
  open,
  yOffset,
  children,
}) => {
  // reference and setter to the dropdown trigger element:
  const [referenceElement, setReferenceElement] = useState(null);

  // reference and setter to the popup/dropdown element:
  const [popperElement, setPopperElement] = useState(null);

  // dropdown visiblity control:
  const [popperOpen, setPopperOpen] = useState(open);

  // initialise popper, with custom options
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    getPopperOptions(placement, yOffset),
  );

  // sets visiblity, calls `onOpenPopper` handler
  const handleOpenPopper = (isOpen) => {
    setPopperOpen(isOpen);
    onOpenPopper(isOpen);
  };

  // when prop `open` is defined, it means something is controlling the popper,
  //  so it takes preference.
  useEffect(() => {
    if (!isUndefined(open)) {
      if (!open && popperOpen) {
        handleOpenPopper(open);
      }
    }
  });

  return (
    <div className="dropdown">
      <div
        className="dropdown__trigger"
        ref={setReferenceElement}
        onClick={() => handleOpenPopper(!popperOpen)}
      >
        { children }
      </div>

      { renderOverlay(popperOpen, handleOpenPopper) }

      <div
        className={getClassNames('dropdown__popper', { open: popperOpen, expand: expandPopper })}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        { renderPopperElement(menu, menuItems) }
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  placement: 'bottom-end',
  yOffset: 0,
  menuItems: [],
  menu: null,
  expandPopper: false,
  onOpenPopper: noOp,
  open: undefined,
};

Dropdown.propTypes = {
  menu: node,
  menuItems: arrayOf(shape({
    label: string.isRequired,
    onClick: func,
  })),
  placement: string,
  yOffset: number,
  children: oneOfType([arrayOf(node), node]).isRequired,
  expandPopper: bool,
  onOpenPopper: func,
  open: bool,
};

export default Dropdown;
