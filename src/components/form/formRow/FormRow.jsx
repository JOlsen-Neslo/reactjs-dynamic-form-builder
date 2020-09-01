/**
 * @module FormRow Component
 * @description
 * Represents a single row with field(s), within a form component.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  node,
  object,
  oneOfType,
} from 'prop-types';

import { getClassNames } from '../../../tools/helpers';

import './formRow.scss';

const FormRow = ({
  center, narrow, scaffold, fluid, styles, children,
}) => (
  <div
    style={styles}
    className={getClassNames('form-row', {
      center, narrow, scaffold, fluid,
    })}
  >
    { children }
  </div>
);

FormRow.defaultProps = {
  center: false,
  narrow: false,
  scaffold: false,
  fluid: false,
  styles: {},
};

FormRow.propTypes = {
  center: bool,
  narrow: bool,
  scaffold: bool,
  fluid: bool,
  styles: object,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

/**
 * A message wrapped in special formatting for a form. For use within
 *  a FormRow component.
 */
export const FormRowMessage = ({ children }) => <div className="form-row__message">{ children }</div>;

FormRowMessage.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default FormRow;
