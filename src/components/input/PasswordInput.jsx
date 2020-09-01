/**
 * @module PasswordInput Component
 * @description
 * A specialised `Input` component, used for passwords. It allows showing/hiding
 *  of the entered password.
 */
import React, { useState } from 'react';
import {
  string,
  bool,
  func,
  oneOfType,
  instanceOf,
  shape,
} from 'prop-types';

import { ReactComponent as IconEyeClosed } from '../../images/icon-eye-closed.svg';
import { ReactComponent as IconEyeOpen } from '../../images/icon-eye-open.svg';
import { noOp } from '../../tools/helpers';

import Input from './Input';

import './input.scss';

const PasswordInput = ({
  name, placeholder, value, inputRef, onChange, error, minimal, lighter,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      lighter={lighter}
      minimal={minimal}
      inputRef={inputRef}
      name={name}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      suffix={(
        <ToggleIcon
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
            )}
    />
  );
};

PasswordInput.defaultProps = {
  value: '',
  minimal: false,
  inputRef: undefined,
  lighter: false,
  error: false,
  onChange: noOp,
};

PasswordInput.propTypes = {
  name: string.isRequired,
  placeholder: string.isRequired,
  value: string,
  minimal: bool,
  lighter: bool,
  error: bool,
  onChange: func,
  inputRef: oneOfType([
    func,
    shape({
      current: instanceOf(Element),
    }),
  ]),
};

/** A utility component to handle the rendering of the toggle password icon. */
const ToggleIcon = ({ showPassword, setShowPassword }) => {
  const handleOnClick = () => setShowPassword(!showPassword);
  const Icon = showPassword ? IconEyeOpen : IconEyeClosed;

  return <Icon className="password-toggle" onClick={handleOnClick} />;
};

ToggleIcon.propTypes = {
  showPassword: bool.isRequired,
  setShowPassword: func.isRequired,
};

export default PasswordInput;
