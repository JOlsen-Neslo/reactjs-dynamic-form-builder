/**
 * @module Tooltip Component
 * @description
 * Serves as the mechanism to drive tooltip functionality. Given a trigger element as `children`
 *  and a `tooltip` element, tooltip will appear upon hovering the trigger.
 */
import React, { useState } from 'react';
import {
  arrayOf,
  node,
  oneOfType,
} from 'prop-types';
import { usePopper } from 'react-popper';

import { getClassNames } from '../../tools/helpers';

import './tooltip.scss';

const getPopperOptions = (placement) => ({
  placement,
});

const Tooltip = ({ children, tooltip }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [popperOpen, setPopperOpen] = useState(false);

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    getPopperOptions('right'),
  );

  return (
    <div className="tooltip">
      <div
        className="tooltip__ref"
        ref={setReferenceElement}
        onMouseEnter={() => setPopperOpen(true)}
        onMouseLeave={() => setPopperOpen(false)}
      >
        { children }
      </div>
      <div
        className={getClassNames('tooltip__tip', { open: popperOpen })}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        { tooltip }
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  tooltip: oneOfType([arrayOf(node), node]),
};

export default Tooltip;
