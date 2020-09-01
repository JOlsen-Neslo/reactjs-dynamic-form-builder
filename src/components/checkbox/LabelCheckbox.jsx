/**
 * @module LabelCheckbox Component
 * @description
 * Wraps a contained `Checkbox` component in a `LabelInput`. It takes a `fieldLabel` prop,
 *  an applies all given props to the nested `Checkbox`.
 */
import React from 'react';
import {
  bool,
  string,
} from 'prop-types';

import LabelInput from '../input/LabelInput';
import Checkbox from './Checkbox';

const LabelCheckbox = (props) => {
  const { fieldLabel, readOnly } = props;

  return (
    <LabelInput lighter label={fieldLabel} readOnly={readOnly}>
      <Checkbox contained {...props} />
    </LabelInput>
  );
};

LabelCheckbox.defaultProps = {
  readOnly: false,
};

LabelCheckbox.propTypes = {
  fieldLabel: string.isRequired,
  readOnly: bool,
};

export default LabelCheckbox;
