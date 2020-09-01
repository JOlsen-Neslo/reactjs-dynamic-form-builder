/**
 * @module Modal Component
 * @description
 * An overlaid message, covering the screen. Can provide custom contents,
 *  and dismiss action.
 */
import React from 'react';
import {
  arrayOf,
  bool,
  func,
  node,
  oneOfType,
  string,
} from 'prop-types';

import {
  getClassNames,
  isUndefined,
  noOp,
} from '../../../tools/helpers';

import './adminModal.scss';

/// Children will be yielded as the header image, to allow custom image manipulations
const renderHeaderImage = (children) => !isUndefined(children) && (
<div className="admin-modal__image">
  { children }
</div>
);

const AdminModal = ({
  shown, title, message, dismissText, onDismiss, children,
}) => (
  <div className={getClassNames('admin-modal', { shown })}>
    <div className="admin-modal__overlay" />

    <div className="admin-modal__container">
      { renderHeaderImage(children) }

      <h4 className="admin-modal__title">{ title }</h4>
      <p className="admin-modal__message">{ message }</p>
      <button onClick={onDismiss} className="admin-modal__action">{ dismissText }</button>
    </div>
  </div>
);

AdminModal.defaultProps = {
  shown: true,
  onDismiss: noOp,
};

AdminModal.propTypes = {
  shown: bool.isRequired,
  title: string.isRequired,
  message: string.isRequired,
  dismissText: string.isRequired,
  onDismiss: func.isRequired,
  children: oneOfType([arrayOf(node), node]),
};

export default AdminModal;
