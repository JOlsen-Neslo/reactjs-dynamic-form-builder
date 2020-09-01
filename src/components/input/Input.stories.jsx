import React from 'react';
import {
  DarkBg,
  Padded,
} from '../../stories/helpers';

import Input from './Input';
import LabelInput from './LabelInput';
import Checkbox from '../checkbox/Checkbox';

export default {
  title: 'Form Elements | Input',
  components: [Input],
};

export const BasicTextInput = () => (
  <Padded>
    <Input placeholder="Placeholder ..." />
    <br />
    <Input
      value="Provided value"
      onChange={() => {
      }}
    />
  </Padded>
);

export const NarrowTextInput = () => (
  <Padded>
    <Input narrow placeholder="Placeholder ..." />
    <br />
    <Input
      narrow
      value="Provided value"
      onChange={() => {
      }}
    />
    <br />
    <Input narrow placeholder="With a text suffix" suffix="ml" />
  </Padded>
);

export const SmallTextInput = () => (
  <Padded>
    <Input small placeholder="Placeholder ..." />
    <br />
    <Input
      small
      value="Provided value"
      onChange={() => {
      }}
    />
    <br />
    <Input small placeholder="With a text suffix" suffix="ml" />
  </Padded>
);

export const TextInputWithSuffix = () => (
  <Padded>
    <Input placeholder="With a text suffix" suffix="ml" />
  </Padded>
);

export const LabelledTextInputs = () => (
  <Padded>
    <LabelInput label="First input" name="one" placeholder="With a text suffix" />
    <br />
    <LabelInput label="Second input" name="two" placeholder="With an icon suffix" />
    <br />
    <LabelInput inline label="Inline label" name="three" placeholder="With an icon suffix" />
    <br />
    <LabelInput inline titleLabel label="Inline titleLabel" name="four" placeholder="With an icon suffix" />
  </Padded>
);

export const LighterTextInputs = () => (
  <Padded>
    <Input lighter placeholder="Placeholder ..." />
    <br />
    <Input
      lighter
      value="Provided value"
      onChange={() => {
      }}
    />
  </Padded>
);

export const LighterTextInputsWithSuffix = () => (
  <Padded>
    <Input lighter placeholder="With a text suffix" suffix="ml" />
  </Padded>
);

export const UsingInputToContainAnyElement = () => (
  <Padded>
    <div>
      <Input>
        <Checkbox name="test" contained label="Does this make me look fat?" />
      </Input>
      <br />
      <Input lighter>
        <Checkbox name="test" contained label="Does this make me look fat?" />
      </Input>
    </div>
  </Padded>
);

export const MinimalTextInput = () => (
  <DarkBg>
    <Padded>
      <Input minimal placeholder="Placeholder ..." />
      <Input
        minimal
        value="Provided value"
        onChange={() => {
        }}
      />
    </Padded>
  </DarkBg>
);

export const MinimalTextInputWithSuffix = () => (
  <DarkBg>
    <Padded>
      <Input minimal placeholder="With a text suffix" suffix="ml" />
    </Padded>
  </DarkBg>
);

export const MinimalTextInputsWithErrors = () => (
  <DarkBg>
    <Padded>
      <Input minimal error value="Just an error, no message" />
      <Input
        minimal
        error
        errorMsg="This is a reason why the value is unacceptable"
        value="This value is incorrect..."
      />
    </Padded>
  </DarkBg>
);

export const InputAsTextArea = () => (
  <Padded>
    <Input>
      <textarea placeholder="rows = 10" rows="10" />
    </Input>
    <br />
    <Input lighter>
      <textarea placeholder="lighter, unspecified rows" />
    </Input>
  </Padded>
);
