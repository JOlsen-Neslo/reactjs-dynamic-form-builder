/**
 * @module Avatar Component
 * @description
 * Little avatar icon displayed with username.
 */
import React from 'react';
import { string } from 'prop-types';

import { getClassNames, } from '../../tools/helpers';

import './avatar.scss';

const isEmpty = (name) => false; // isUndefined(name) || isNull(name); removed for demo purposes

const Avatar = ({ name }) => (
  <div className={getClassNames('avatar', { empty: isEmpty(name) })}>
    <div className="avatar__message">
      Hello,
      { ' ' }
      <strong>{ name }</strong>
    </div>
    <div className="avatar__icon" />
  </div>
);

Avatar.defaultProps = {
  name: 'Jordan Olsen',
};

Avatar.propTypes = {
  name: string,
};

export default Avatar;
