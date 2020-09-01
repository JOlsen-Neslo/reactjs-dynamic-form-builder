/**
 * @module Spinner Component
 * @description
 * A simple css loader, taken and reworked from https://loading.io/
 */
import React from 'react';
import {
  bool,
  object,
} from 'prop-types';

import { getClassNames } from '../../tools/helpers';

import './spinner.scss';

const Spinner = ({ blue, styles }) => (
  <div
    style={styles}
    className={getClassNames('loader-ellipsis', { blue })}
  >
    <div />
    <div />
    <div />
    <div />
  </div>
);

Spinner.defaultProps = {
  blue: false,
  styles: {},
};

Spinner.propTypes = {
  blue: bool,
  styles: object,
};

export default Spinner;
