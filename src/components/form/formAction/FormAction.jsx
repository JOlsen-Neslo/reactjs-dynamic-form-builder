/**
 * @module FormAction Component
 * @description
 * A form action (e.g. adding fields, submit button) that takes up a row.
 * Accepts an optional message displayed in the row.
 */
import React from 'react';
import {
  bool,
  func,
  string,
} from 'prop-types';

import {
  getClassNames,
  noOp,
} from '../../../tools/helpers';

import Button from '../../button/Button';

import './formAction.scss';

const FormAction = ({
  hidden, secondary, message, actionLabel, loading, floating, onClick,
}) => (
  <div className={getClassNames('form-action', { secondary, floating, hidden })}>
    <p className="form-action__message typo-small-title">
      { message }
    </p>
    <div className="form-action__action">
      <Button
        hollow={secondary}
        label={actionLabel}
        onClick={onClick}
        loading={loading}
      />
    </div>
  </div>
);

FormAction.defaultProps = {
  hidden: false,
  secondary: false,
  loading: false,
  floating: false,
  message: '',
  onClick: noOp,
};

FormAction.propTypes = {
  hidden: bool,
  secondary: bool,
  loading: bool,
  floating: bool,
  message: string,
  actionLabel: string.isRequired,
  onClick: func,
};

export default FormAction;
