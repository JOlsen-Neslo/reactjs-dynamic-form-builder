import React from 'react';

import { DarkBg, Padded } from '../../stories/helpers';
import { noOp } from '../../tools/helpers';

import Fieldset from './fieldset/Fieldset';
import Input from '../input/Input';
import Button from '../button/Button';
import FormAction from './formAction/FormAction';
import Form from './Form';
import FormRow from './formRow/FormRow';


export default {
  title: 'Form Elements | Form',
  components: [Form]
};

export const StandardForm = () => (
  <Padded>
    <Form>
      <FormRow>
        <Fieldset title="Fields within a fieldset">
          <Input type={'text'} placeholder={'Enter some stuff...'} />
          <Input type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
        </Fieldset>
      </FormRow>
      <FormAction actionLabel='Submit' />
    </Form>
  </Padded>
);

export const WithFluidRows = () => (
  <Padded>
    <Form>
      <FormRow fluid>
        <Fieldset title="Fields within a fieldset">
          <Input type={'text'} placeholder={'Enter some stuff...'} />
          <Input type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
        </Fieldset>
        <Fieldset title="Fields within a fieldset">
          <Input type={'text'} placeholder={'Enter some stuff...'} />
          <Input type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
        </Fieldset>
        <Fieldset title="Fields within a fieldset">
          <Input type={'text'} placeholder={'Enter some stuff...'} />
          <Input type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
        </Fieldset>
      </FormRow>
      <FormAction actionLabel='Submit' />
    </Form>
  </Padded>
);

export const WithAFluidFieldset = () => (
  <Padded>
    <Form>
      <FormRow>
        <Fieldset fluid title="Fields within a fieldset">
          <Input type={'text'} placeholder={'Enter some stuff...'} />
          <Input type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
          <Input type={'text'} placeholder={'Enter some stuff...'} />
          <Input type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
          <Input type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
        </Fieldset>
      </FormRow>
      <FormAction actionLabel='Submit' />
    </Form>
  </Padded>
);

export const MinimalForm = () => (
  <DarkBg>
    <Padded>
      <Form narrow>
        <FormRow>
          <Input minimal type={'text'} placeholder={'Enter some stuff...'} />
        </FormRow>
        <FormRow>
          <Input minimal type={'text'} placeholder={'With an icon suffix'} suffix={'ml'} />
        </FormRow>
        <FormRow scaffold>
          <a href='#'>Some link</a>
        </FormRow>
        <FormRow>
          <Button label='button' onClick={noOp} />
        </FormRow>
      </Form>
    </Padded>
  </DarkBg>
);
