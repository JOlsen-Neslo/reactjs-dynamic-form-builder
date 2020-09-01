import Input from '../input/Input';
import LabelInput from '../input/LabelInput';
import FileInput from '../fileInput/FileInput';
import Checkbox from '../checkbox/Checkbox';
import Select from '../select/Select';
import LabelCheckbox from '../checkbox/LabelCheckbox';
import { isNull, getFileAsBase64 } from '../../tools/helpers';

/**
 * Given a `field` object, determine what type of component is required to render it.
 * This is an advantageous place to choose a more specific type of component, based on
 *  properties received within the field configuration object.
 *
 * @example <caption>Labelled text input</caption>
 * getComponentForField({ type: 'text', label: 'First name' })
 * // returns LabelInput
 */
export const getComponentForField = (field) => {
  switch (field.type) {
    case 'text':
      return LabelInput;

    case 'file':
      return FileInput;

    case 'checkbox':
      if (!isNull(field.label)) {
        return LabelCheckbox;
      }
      return Checkbox;

    case 'select':
      return Select;

    // we want to know if a certain field type was not found
    default:
      console.info(`FormBuilder: Could not find Component for field type '${field.type}', using Input.`);
      return Input;
  }
};

const placeholderSelectMenuItems = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
];

/**
 * Returns the props required for a certain field type.
 * This is a good place to re-map any received properties in the field configuration object.
 */
export const getPropsForField = (field) => {
  // replace null values
  const addFieldProps = {
    ...field,
    value: field.value === 'null' ? null : field.value,
  };

  switch (field.type) {
    case 'text':
      return addFieldProps;

    case 'file':
      // if there is value for the file, use 'update' as the button label
      const label = addFieldProps.value ? 'Update logo' : 'Upload logo';
      // if there is a value, load it as an image and display it in place of `uploadInstruction`
      const instruction = addFieldProps.placeholder;

      return {
        ...addFieldProps,
        uploadInstruction: instruction,
        preview: addFieldProps.value,
        label,
      };

    // for checkbox, we are re-mapping label -> fieldLabel,
    // since the LabelCheckbox and its contained Checkbox both require labels
    case 'checkbox':
      return {
        ...addFieldProps,
        fieldLabel: addFieldProps.label,
        label: addFieldProps.placeholder,
        checked: addFieldProps.value,
        contained: true,
      };

    case 'select':
      let menuItems;

      // protect against options not being present for the select
      if (!addFieldProps.options) {
        menuItems = placeholderSelectMenuItems;
        console.info(`Form Builder: Could not find select options for '${addFieldProps.name}'`);
      } else {
        menuItems = addFieldProps.options;
      }

      return {
        ...addFieldProps,
        menuItems,
      };

    // when we can't find props for a type, use text input props, and notify
    default:
      console.info(`FormBuilder: Props for ${addFieldProps.type} not found, using text props.`);
      return {
        ...addFieldProps,
        type: 'text',
      };
  }
};

/**
 * Returns a function that has the ability to retrieve a value from a particular field type.
 * This is because different input types have different ways of getting their values.
 */
export const getValueHandlerForField = (field) => {
  switch (field.type) {
    case 'checkbox':
      return (e) => e.target.checked;

    case 'file':
      return async (e) => {
        const file = e.target.files[0];
        return await getFileAsBase64(file);
      };

    case 'select':
      return (optionValue) => optionValue;

    // default method is event.target.value
    default:
      return (e) => e.target.value;
  }
};

/**
 * Loops through a field config structure received from the api, and removes
 *  all unwanted properties. We are only after the structure, section names,
 *  and field names and values.
 */
export const stripFieldConfig = (fieldConfig) => {
  const { fields: { name, rows } } = fieldConfig;

  return {
    fields: {
      name,
      rows: rows.map(stripRowFields),
    },
  };
};

// strip each row, keeping only `sections`
const stripRowFields = (row) => {
  const strippedSections = row.sections.map(stripSectionFields);

  return {
    sections: strippedSections,
  };
};

// strip each section, keeping only `name` and `fields`
const stripSectionFields = (section) => {
  const { name, fields } = section;

  // keep only the section name, and its fields
  return {
    name,
    fields: fields.map(stripField),
  };
};

// keep only the field properties we require
const stripField = ({ name, value }) => ({
  name,
  value,
});
