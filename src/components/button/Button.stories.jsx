import React from 'react';
import { action } from '@storybook/addon-actions';

import { Padded } from '../../stories/helpers';
import { noOp } from '../../tools/helpers';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

export default {
  title: 'Form Elements | Button',
  components: [Button],
};

export const DefaultButton = () => (
  <Padded>
    <Button large label="Large button" onClick={action('You clicked Large button')} />
    <Button label="Default button" onClick={action('You clicked Default button')} />
    <Button medium label="Medium button" onClick={action('You clicked Small button')} />
    <Button small label="Small button" onClick={action('You clicked Small button')} />
  </Padded>
);

export const LightButton = () => (
  <Padded>
    <Button large light label="light button" onClick={action('You clicked light button')} />
    <Button light label="light button" onClick={action('You clicked light button')} />
    <Button medium light label="light button" onClick={action('You clicked light button')} />
    <Button small light label="light button" onClick={action('You clicked light button')} />
  </Padded>
);

export const HollowButton = () => (
  <Padded>
    <Button large hollow label="Hollow button" onClick={action('You clicked Hollow button')} />
    <Button hollow label="Hollow button" onClick={action('You clicked Hollow button')} />
    <Button medium hollow label="Hollow button" onClick={action('You clicked Hollow button')} />
    <Button small hollow label="Hollow button" onClick={action('You clicked Hollow button')} />
  </Padded>
);

export const DisabledButton = () => (
  <Padded>
    <Button large label="Disabled button" disabled onClick={noOp} />
    <Button label="Disabled button" disabled onClick={noOp} />
    <Button medium label="Disabled button" disabled onClick={noOp} />
    <Button small label="Disabled button" disabled onClick={noOp} />
  </Padded>
);

export const ButtonGroups = () => (
  <Padded>
    <h4>Two buttons:</h4>
    <ButtonGroup>
      <Button label="one" />
      <Button light label="two" />
    </ButtonGroup>
    <br />
    <h4>Three buttons:</h4>
    <ButtonGroup>
      <Button hollow label="one" />
      <Button label="two" />
      <Button light label="three" />
    </ButtonGroup>
    <br />
    <h4>Four buttons:</h4>
    <ButtonGroup>
      <Button light label="one" />
      <Button hollow label="two" />
      <Button disabled label="three" />
      <Button label="four" />
    </ButtonGroup>
  </Padded>
);
