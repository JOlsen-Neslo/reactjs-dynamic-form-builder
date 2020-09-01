import React from 'react';
import { action } from '@storybook/addon-actions';
import { Padded } from '../../stories/helpers'

import Guide from './Guide';

export default {
  title: 'Guide',
  components: [Guide]
};

export const EmptyGuide = () => (
  <Padded>
    <Guide />
  </Padded>
);

export const WithContent = () => (
  <Padded>
    <Guide>
      You can place any content within here...
      You can place any content within here...
      You can place any content within here...
      You can place any content within here...
    </Guide>
  </Padded>
);
