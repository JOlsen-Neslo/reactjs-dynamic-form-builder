/**
 * @module Button Component
 * @description
 * A general purpose html button wrapper.
 */
import React from 'react';
import {
  bool, func, node, object,
} from 'prop-types';

import { getClassNames, noOp } from '../../tools/helpers';

import Spinner from '../loader/Spinner';

import './button.scss';

const Button = ({
  label, disabled, onClick, loading, small, medium, large, hollow, light, styles,
}) => (
  <button
    className={getClassNames('button', {
      small, large, hollow, loading, medium, light,
    })}
    disabled={disabled}
    onClick={loading ? noOp : onClick}
    style={styles}
  >
    {loading ? <Spinner blue={hollow} /> : label}
  </button>
);

Button.defaultProps = {
  disabled: false,
  small: false,
  medium: false,
  large: false,
  hollow: false,
  onClick: noOp,
  loading: false,
  styles: {},
};

Button.propTypes = {
  label: node.isRequired,
  disabled: bool,
  onClick: func,
  loading: bool,
  small: bool,
  medium: bool,
  large: bool,
  hollow: bool,
  styles: object,
};

export default Button;
