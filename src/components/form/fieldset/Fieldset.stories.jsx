import React from 'react';
import LabelInput from '../../input/LabelInput';
import FormRow from '../formRow/FormRow';
import Fieldset from './Fieldset';
import { Padded } from '../../../stories/helpers';

export default {
  title: 'Form Elements | Fieldset',
  components: [Fieldset],
};

export const BasicFieldset = () => (
  <Padded>
    <FormRow>
      <Fieldset title="Some grouped fields here">
        <LabelInput label="Input one" type="text" placeholder="Enter some stuff..." />
        <LabelInput label="Another field" type="text" placeholder="With an icon suffix" />
      </Fieldset>
    </FormRow>
  </Padded>
);

export const FluidFieldset = () => (
  <Padded>
    <FormRow>
      <Fieldset fluid title="Some grouped fields here">
        <LabelInput label="Input one" type="text" placeholder="Enter some stuff..." />
        <LabelInput label="Input two" type="text" placeholder="With an icon suffix" />
        <LabelInput label="Input three" type="text" placeholder="With an icon suffix" />
        <LabelInput label="Input four" type="text" placeholder="With an icon suffix" />
        <LabelInput label="Input five" type="text" placeholder="With an icon suffix" />
      </Fieldset>
    </FormRow>
  </Padded>
);
