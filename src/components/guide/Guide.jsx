/**
 * @module Guide Component
 * @description
 * Meant to serve as a container for tooltip/guided messages.
 */
import React from 'react';
import { node, oneOfType, arrayOf } from 'prop-types';
import './guide.scss';

import { ReactComponent as IconBulb } from '../../images/icon-bulb.svg';
import { ReactComponent as IconClose } from '../../images/icon-close.svg';


const Guide = ({ children }) => (
  <div className='guide'>
    <div className='guide__header'>
      <IconBulb className='guide__header-icon' />
      <p className='guide__title'>Our Top Tip</p>

      <div className='guide__actions'>
        <IconClose />
      </div>
    </div>

    <div className='guide__body'>{children}</div>
  </div>
);

Guide.propTypes = {
  children: oneOfType([arrayOf(node), node])
};

export default Guide;