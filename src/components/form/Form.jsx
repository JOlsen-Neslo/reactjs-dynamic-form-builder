/**
 * @module Form Component
 * @description
 * A wrapper component for an html form.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  node,
  oneOfType,
} from 'prop-types';

import {
  getClassNames,
  preventDefault,
} from '../../tools/helpers';

import './form.scss';

const Form = ({ narrow, children }) => (
  <form
    className={getClassNames('form', { narrow })}
    onSubmit={preventDefault}
  >
    { children }
  </form>
);

Form.defaultProps = {
  narrow: false,
};

Form.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  narrow: bool,
};

export default Form;
