import React from 'react';

import {
  DarkBg,
  Padded,
} from '../../stories/helpers';

import Spinner from './Spinner';

export default {
  title: 'Spinner',
  components: [Spinner],
};

export const Ellipsis = () => (
  <>
    <DarkBg>
      <Padded>
        <Spinner />
      </Padded>
    </DarkBg>
    <Padded>
      <Spinner blue />
    </Padded>
  </>
);
