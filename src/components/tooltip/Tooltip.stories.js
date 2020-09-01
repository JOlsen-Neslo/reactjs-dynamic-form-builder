import React from 'react';

import { Padded } from '../../stories/helpers';

import Tooltip from './Tooltip';
import Guide from '../guide/Guide';

export default {
  title: 'Tooltip',
  components: [Tooltip],
};

const CustomTooltip = ({ children }) => (
  <div style={{
    backgroundColor: 'gray', borderRadius: '5px', padding: '.2rem .5rem', color: 'white',
  }}
  >
    { children }
  </div>
);

export const WithCustomTooltipElement = () => (
  <Padded>
    <Tooltip tooltip={<CustomTooltip>This is a test custom tooltip</CustomTooltip>}>
      <p style={{ display: 'inline', border: '1px dotted lightgray' }}>Trigger element</p>
    </Tooltip>
  </Padded>
);

export const WithGuideAsTooltip = () => (
  <Padded>
    <Tooltip tooltip={<Guide>This is a tooltip using a `Guide` component as its container</Guide>}>
      <p style={{ display: 'inline', border: '1px dotted lightgray' }}>Trigger element</p>
    </Tooltip>
  </Padded>
);
