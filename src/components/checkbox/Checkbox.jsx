/**
 * @module Checkbox Component
 * @description
 * Relies on a native `input[type='checkbox']` to enable checkbox funcationlity.
 * Can be contained by other elements, in which case, it will inherit font styles
 *  and expand into its container.
 */
import React, { useState } from 'react';
import {
  bool,
  func,
  number,
  oneOfType,
  string,
} from 'prop-types';

import {
  getClassNames,
  noOp,
} from '../../tools/helpers';

import { ReactComponent as IconDash } from '../../images/icon-dash-small.svg';
import { ReactComponent as IconCheck } from '../../images/icon-check-small.svg';

import './checkbox.scss';

const renderIndicatorIcon = (isChecked) => (isChecked ? <IconCheck /> : <IconDash />);

const renderLabel = (label) => label && <p className="checkbox__label">{ label }</p>;

const Checkbox = ({
  name, checked, label, contained, centered, onChange, readOnly,
}) => {
  const [isChecked, setChecked] = useState(checked || false);

  const handleChange = (event) => {
    const { target: { checked } } = event;
    setChecked(checked);
    onChange(event);
  };

  return (
    <label className={getClassNames('checkbox', { contained, centered, 'read-only': readOnly })}>
      <input
        name={name}
        type="checkbox"
        checked={isChecked}
        className="checkbox__native"
        onChange={readOnly ? noOp : handleChange}
        readOnly={readOnly}
      />
      { renderLabel(label) }
      <div className={getClassNames('checkbox__indicator', { checked: isChecked })}>
        { renderIndicatorIcon(isChecked) }
      </div>
    </label>
  );
};

Checkbox.defaultProps = {
  checked: false,
  centered: false,
  contained: false,
  onChange: noOp,
  readOnly: false,
  name: '',
  label: '',
};

Checkbox.propTypes = {
  name: string,
  label: string,
  centered: bool,
  readOnly: bool,
  checked: oneOfType([bool, number]),
  contained: bool,
  onChange: func,
};

export default Checkbox;
