import React, { Component } from 'react';
import {
  arrayOf,
  node,
  oneOfType,
} from 'prop-types';

import { setBodyClass } from '../../tools/helpers';

import CenterLayout from '../layout/CenterLayout';
import Form from '../form/Form';
import FormRow from '../form/formRow/FormRow';

class AuthWrapper extends Component {
  componentDidMount() {
    setBodyClass('auth');
  }

  render() {
    const { children } = this.props;
    return (
      <CenterLayout>
        <Form narrow>
          <FormRow center>
            <h6>Logo goes here</h6>
          </FormRow>

          { children }

          <FormRow center scaffold>
            <a href="/privacy">Privacy and Terms and Conditions</a>
          </FormRow>
        </Form>
      </CenterLayout>
    );
  }
}

AuthWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default AuthWrapper;
