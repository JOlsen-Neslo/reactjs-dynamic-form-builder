import React, { useState } from 'react';
import './actionMenu.scss';
import { getClassNames } from '../../tools/helpers';

const renderActions = (actions) => actions.map(({ label, icon, handlerFn }) => (
  <li
    key={label}
    className="action-menu__item typo-small-title"
    onClick={handlerFn}
  >
    { icon }
    {' '}
    { label }
  </li>
));

const ActionMenu = ({ children, actions }) => {
  const [shown, setShown] = useState(false);

  return (
    <div onMouseLeave={() => setShown(false)}>
      <div className="action-menu__trigger" onMouseEnter={() => setShown(true)}>
        { children }
      </div>
      <ul className={getClassNames('action-menu', { shown })}>
        { renderActions(actions) }
      </ul>
    </div>
  );
};

export default ActionMenu;
