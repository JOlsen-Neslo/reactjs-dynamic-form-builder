/**
 * @module Select Component
 * @description
 * A styled wrapper around a native select component. Makes use of `Dropdown` Component for
 *  handling the dropdown, and an `Input` component for the selected item. This can be styled
 *  as 'minimal' by passing it the prop.
 */
import React, { Component } from 'react';
import {
  arrayOf,
  bool,
  func,
  node,
  number,
  object,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import './select.scss';

import { ReactComponent as IconChevDown } from '../../images/icon-chev-down.svg';
import {
  getClassNames,
  isNull,
  isUndefined,
  noOp,
} from '../../tools/helpers';

import Dropdown from '../dropdown/Dropdown';
import DropdownMenu from '../dropdown/DropdownMenu';
import Input from '../input/Input';
import LabelInput from '../input/LabelInput';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedValue: props.value || null,
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    // if the value provided has updated, set it as the selectedValue
    if (prevProps.value !== value) {
      this.setState({ selectedValue: value });
    }
  }

  /** Finds the label of the associated `selectedValue`. */
  getSelectedLabel() {
    const { placeholder = 'Choose something' } = this.props;
    const { selectedValue } = this.state;

    if (isNull(selectedValue)) {
      return placeholder;
    }

    const selectedOption = this.findSelectedOption(selectedValue);
    if (isUndefined(selectedOption)) {
      return placeholder;
    }

    return selectedOption.label;
  }

  /** Formats all menu items for use by the dropdown. */
  getMenuItems() {
    const { menuItems } = this.props;
    return menuItems.map((item) => this.formatMenuItem(item));
  }

  /**
     * Given a menu item with just `label` and `value`, attach click handlers for selecting an item,
     *  and whether or not the item is selected.
     * @param {Object} item - item containing a `label` and `value`
     */
  formatMenuItem(item) {
    const { value } = item;
    const { selectedValue } = this.state;

    return {
      ...item,
      onClick: (e) => this.handleChangeOption(value, e),
      selected: value === selectedValue,
    };
  }

  /** Find an option based on `selectedValue`. */
  findSelectedOption(selectedValue) {
    const { menuItems } = this.props;
    return menuItems.find(({ value }) => value === selectedValue);
  }

  getInputComponent(label) {
    return !isUndefined(label) ? LabelInput : Input;
  }

  /**
     * Update the select value, then call `onChange` handler.
     * @param {string} value - value of the associated option, to set as the `selectedValue`
     */
  handleChangeOption(value, event) {
    const { onChange } = this.props;

    // persist the event, as we are using it asynchronously below
    event.persist();

    this.setState({
      selectedValue: value,
      open: false,
    },
    () => onChange(value, event));
  }

  renderDropdownMenu() {
    const { minimal, narrow } = this.props;
    return (
      <DropdownMenu
        select
        minimal={minimal}
        narrow={narrow}
        menuItems={this.getMenuItems()}
      />
    );
  }

  renderIndicator() {
    const { icon, readOnly } = this.props;
    const IconComponent = icon || IconChevDown;

    return !readOnly && (
    <div className="select__indicator">
      <IconComponent />
    </div>
    );
  }

  render() {
    const {
      minimal, small, readOnly, narrow, transparent, noPadding, styles, label,
    } = this.props;
    const { open, selectedValue } = this.state;

    const buildContainerClasses = () => getClassNames('select', {
      open,
      'has-value': !isNull(selectedValue),
      minimal,
      small,
      narrow,
      'read-only': readOnly,
      transparent,
      'no-padding': noPadding,
    });

    const InputComponent = this.getInputComponent(label);

    return (
      <div className={buildContainerClasses()} style={styles}>
        <Dropdown
          placement="bottom"
          yOffset={minimal ? 4 : 0}
          menu={this.renderDropdownMenu()}
          open={open}
          onOpenPopper={(isOpen) => !readOnly && this.setState({ open: isOpen })}
          expandPopper
        >
          <InputComponent
            label={label}
            minimal={minimal}
            small={small}
            readOnly={readOnly}
            narrow={narrow}
          >
            <div className="select__selected">
              <div className="select__label">{ this.getSelectedLabel() }</div>
              { this.renderIndicator() }
            </div>
          </InputComponent>
        </Dropdown>
      </div>
    );
  }
}

Select.defaultProps = {
  menuItems: [],
  onChange: noOp,
  placeholder: 'Choose something',
  minimal: false,
  narrow: false,
  transparent: false,
  noPadding: false,
  small: false,
  readOnly: false,
  label: undefined,
  styles: {},
  icon: undefined,
  value: '',
};

Select.propTypes = {
  menuItems: arrayOf(shape({
    label: oneOfType([string, node]).isRequired,
    value: oneOfType([string, number]).isRequired,
  })),
  placeholder: oneOfType([string, node]),
  minimal: bool,
  narrow: bool,
  transparent: bool,
  noPadding: bool,
  styles: object,
  icon: node,
  onChange: func,
  label: string,
  small: bool,
  readOnly: bool,
  value: oneOfType([string, number, object]),
};

export default Select;
