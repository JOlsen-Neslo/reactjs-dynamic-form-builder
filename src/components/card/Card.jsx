/**
 * @module Card Component
 * @description
 * A Card, intended on being displayed as menu items.
 */
import React from 'react';
import {
  arrayOf,
  func,
  node,
  object,
  oneOfType,
  string,
} from 'prop-types';
import './card.scss';

import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { noOp } from '../../tools/helpers';

/// Container for a card, if it is meant to be a link
const CardLinkContainer = ({ path, children }) => (
  <Link to={path} className="card">
    { children }
  </Link>
);

/// A static container for a card
const CardStaticContainer = ({ children }) => (
  <div className="card">
    { children }
  </div>
);

const Card = ({
  actionLabel, path, onAction, children,
}) => {
  // dynamically decide on what container element to use, link or static
  const ContainerComponent = path ? CardLinkContainer : CardStaticContainer;

  return (
    <ContainerComponent path={path}>
      <div className="card__body">
        { children }
      </div>

      <div className="card__action-container">
        <div className="card__action">
          <Button
            small
            hollow
            rounder
            label={actionLabel}
            onClick={onAction}
          />
        </div>
      </div>
    </ContainerComponent>
  );
};

Card.defaultProps = {
  onAction: noOp,
  actionLabel: 'View',
};

Card.propTypes = {
  actionLabel: string.isRequired,
  onAction: func.isRequired,
  dataAttrs: object,
  children: oneOfType([arrayOf(node), node]),
};

export default Card;
