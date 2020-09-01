/**
 * @module LabelInput Component
 * @description
 * Wraps an `Input` component in a label element. It takes a label prop,
 *  an applies all given props to the nested `Input`.
 */
import React from 'react';
import {
  bool,
  string,
} from 'prop-types';

import { getClassNames } from '../../tools/helpers';

import Input from './Input';

import './input.scss';

const getTitleClassnames = (titleLabel) => (titleLabel ? 'label__title typo-form-title' : 'label__title');

/// Only render the title block if either `label` or `errorMsg` is present
const renderTitle = (label, errorMsg, titleLabel) => (label || errorMsg) && (
<p className={getTitleClassnames(titleLabel)}>
  <span className="title">{ label }</span>
  <span className="error">{ errorMsg }</span>
</p>
);

const LabelInput = (props) => {
  const {
    label, inline, titleLabel, errorMsg, ...inputProps
  } = props;

  return (
    <label className={getClassNames('label', { inline, titleLabel })}>
      { renderTitle(label, errorMsg, titleLabel) }
      <Input {...inputProps} />
    </label>
  );
};

LabelInput.defaultProps = {
  label: '',
  inline: false,
  titleLabel: false,
  errorMsg: '',
};

LabelInput.propTypes = {
  label: string,
  inline: bool,
  titleLabel: bool,
  errorMsg: string,
};

export default LabelInput;
