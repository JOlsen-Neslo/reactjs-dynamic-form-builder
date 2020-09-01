/**
 * @module Fieldset Component
 * @description
 * Wraps content/inputs in a fieldset element, apply a `title` as
 *  the formatted legend. Meant to group sets of inputs/form-rows.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  node,
  oneOfType,
  string,
} from 'prop-types';

import { getClassNames } from '../../../tools/helpers';

import './fieldset.scss';

const Fieldset = ({ title, fluid, children }) => (
  <fieldset className={getClassNames('fieldset', { fluid })}>
    <legend className="typo-form-title">{ title }</legend>
    <div className="fieldset__fields">
      { children }
    </div>
  </fieldset>
);

Fieldset.defaultProps = {
  title: '',
  fluid: false,
};

Fieldset.propTypes = {
  title: string,
  fluid: bool,
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default Fieldset;
