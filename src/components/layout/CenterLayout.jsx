/**
 * @module CenterLayout Component
 * @description
 * A layout component for displaying content at screen-center, horizontally
 *  and vertically.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  node,
  oneOfType,
} from 'prop-types';

import { getClassNames } from '../../tools/helpers';

import './layout.scss';

const CenterLayout = ({ contained, narrow, children }) => (
  <div className={getClassNames('layout-center', { contained, narrow })}>
    { children }
  </div>
);

CenterLayout.defaultProps = {
  contained: false,
  narrow: false,
};

CenterLayout.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  contained: bool,
  narrow: bool,
};

export default CenterLayout;
