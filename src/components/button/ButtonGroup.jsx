/**
 * @module ButtonGroup Component
 * @description
 * A utility component for layout out a set of buttons (or anything) horizontally,
 *  with a gutter between items.
 */
import React from 'react';
import {
  oneOfType,
  arrayOf,
  node,
} from 'prop-types';

import './button.scss';

const ButtonGroup = ({ children }) => (
  <div className="button-group">
    { children }
  </div>
);

ButtonGroup.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default ButtonGroup;
