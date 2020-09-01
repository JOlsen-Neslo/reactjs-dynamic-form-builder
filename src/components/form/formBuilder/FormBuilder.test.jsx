import React from 'react';
import { render } from '@testing-library/react';
import FormBuilder from './FormBuilder';

const getTextField = (name, label = null) => ({
  type: 'text',
  name,
  placeholder: 'test',
  value: null,
  label,
});

const getFileField = (name) => ({
  label: null,
  name,
  placeholder: 'test',
  type: 'file',
  value: null,
});

const getCheckboxField = (name, label = null) => ({
  label,
  name,
  placeholder: 'test',
  type: 'checkbox',
  value: false,
});

describe('FormBuilder', () => {
  test('should render a FormRow for each row provided', () => {
    const fields = {
      rows: [{
        sections: [{
          name: 'one',
          fields: [getTextField('field1'), getTextField('field2')],
        }],
      }, {
        sections: [{
          name: 'two',
          fields: [getTextField('field1'), getTextField('field2')],
        }],
      }],
    };

    const { container } = render(<FormBuilder fields={fields} />);

    const rows = container.querySelectorAll('.form-row');
    expect(rows.length).toEqual(2);
  });

  describe('field rendering', () => {
    describe('unrecognisable field types', () => {
      test('should render as a text input', () => {
        const fields = {
          rows: [{
            sections: [{
              name: 'one',
              fields: [{ name: 'test', type: 'blah-dee-bloo' }],
            }],
          }],
        };

        const { container } = render(<FormBuilder fields={fields} />);
        const textInputEl = container.querySelector("input[type='text']");
        expect(textInputEl).toBeInTheDocument();
      });
    });

    describe('input type text', () => {
      test('should render a text input', () => {
        const fields = {
          rows: [{
            sections: [{
              name: 'one',
              fields: [getTextField('field1')],
            }],
          }],
        };

        const { container } = render(<FormBuilder fields={fields} />);
        const textInputEl = container.querySelector("input[type='text']");
        expect(textInputEl).toBeInTheDocument();
      });

      test('should render a labelled text field if label is provided', () => {
        const fields = {
          rows: [{
            sections: [{
              name: 'one',
              fields: [getTextField('field1', 'This is field one')],
            }],
          }],
        };

        const { container } = render(<FormBuilder fields={fields} />);
        const labelEl = container.querySelector('.label');
        const textInputEl = container.querySelector("input[type='text']");

        expect(labelEl).toHaveTextContent('This is field one');
        expect(labelEl).toContainElement(textInputEl);
      });
    });

    describe('input type file', () => {
      test('should render a file input', () => {
        const fields = {
          rows: [{
            sections: [{
              name: 'one',
              fields: [getFileField('field1')],
            }],
          }],
        };

        const { container } = render(<FormBuilder fields={fields} />);
        const fileInputEl = container.querySelector("input[type='file']");
        expect(fileInputEl).toBeInTheDocument();
      });
    });

    describe('input type checkbox', () => {
      test('should render a normal checkbox input', () => {
        const fields = {
          rows: [{
            sections: [{
              name: 'one',
              fields: [getCheckboxField('field1')],
            }],
          }],
        };

        const { container } = render(<FormBuilder fields={fields} />);
        const checkboxInputEl = container.querySelector("input[type='checkbox']");
        expect(checkboxInputEl).toBeInTheDocument();
      });

      test('should render a labelled checkbox field if label is provided', () => {
        const fields = {
          rows: [{
            sections: [{
              name: 'one',
              fields: [getCheckboxField('field1', 'This is a checkbox')],
            }],
          }],
        };

        const { container } = render(<FormBuilder fields={fields} />);
        const labelEl = container.querySelector('.label');
        const checkboxEl = container.querySelector("input[type='checkbox']");

        expect(labelEl).toHaveTextContent('This is a checkbox');
        expect(labelEl).toContainElement(checkboxEl);
      });
    });
  });
});
