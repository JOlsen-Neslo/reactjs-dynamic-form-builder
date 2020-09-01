/**
 * @module Loader Component
 * @description
 * A wrapper around spinner animations, meant to span across screen space
 *  (e.g. when waiting on data for an entire page section)
 */
import React from 'react';

import './loader.scss';

import Spinner from './Spinner';

const Loader = () => (
  <div className="loader">
    <Spinner blue />
  </div>
);

export default Loader;
