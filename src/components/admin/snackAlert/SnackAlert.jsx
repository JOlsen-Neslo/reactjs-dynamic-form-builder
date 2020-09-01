/**
 * @module SnackAlert Component
 * @description
 * A single message that enters in from the edge of the screen.
 * Allows triggering of an exit animation before removing the SnackAlert.
 */
import React, {
  useEffect,
  useState,
} from 'react';

import { ReactComponent as IconList } from '../../../images/icon-list.svg';
import { ReactComponent as IconSuccess } from '../../../images/icon-success.svg';
import { ReactComponent as IconWarning } from '../../../images/icon-warning.svg';

import { getClassNames } from '../../../tools/helpers';

import './snackAlert.scss';

export const SNACK_INFO = 'snack--info';
export const SNACK_WARNING = 'snack--warning';
export const SNACK_SUCCESS = 'snack--success';
export const SNACK_CRITICAL = 'snack--critical';

const renderIcon = (status) => {
  switch (status) {
    case SNACK_SUCCESS:
      return <IconSuccess />;

    case SNACK_WARNING:
      return <IconWarning />;

    case SNACK_CRITICAL:
      return <IconWarning />;

    default:
      return <IconList />;
  }
};

/** On mount, add an `entering` modifier, to trigger the enter animation. */
const SnackAlert = ({
  status = SNACK_INFO, title, closing = false, onClose,
}) => {
  const [entering, setEntering] = useState(true);

  // On initial load, remove `entering` to remove the enter animation. Clear timeout on cleanup
  useEffect(() => {
    const timeout = setTimeout(() => setEntering(false), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${getClassNames('snack', { entering, closing })} ${status}`}>
      <div className="snack__icon">
        { renderIcon(status) }
      </div>
      <div className="snack__title">
        <p className="typo-form-title">{ title }</p>
      </div>
      <div className="snack__actions">
        <button className="typo-small-title" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SnackAlert;
