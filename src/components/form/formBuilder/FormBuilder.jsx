/**
 * @module FormBuilder Component
 * @description
 * Accepts a field configuration object, and renders fields into a collection
 *  of `FormRows` with nested `Fieldset` sections.
 */
import React, {
    Component,
    Fragment
} from 'react';
import {
    array,
    arrayOf,
    func,
    shape,
    string
} from 'prop-types';

import {
    getComponentForField,
    getPropsForField,
    getValueHandlerForField
} from '../form.helpers';

import Fieldset from '../fieldset/Fieldset';
import FormRow from '../formRow/FormRow';
import FormAction from '../formAction/FormAction';

class FormBuilder extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            form: {
                fields: props.fields
            },
        };
    }
    
    componentDidUpdate(prevProps) {
        /// When a new set of fields are received, update the state form object
        if (prevProps && prevProps.fields) {
            if (this.props.fields.name !== prevProps.fields.name) {
                this.setState({
                    form: {
                        fields: this.props.fields
                    }
                });
            }
        }
    }
    
    /**
     * Gets the value handler for a particular field type. Location of the field is represented
     *  by row/section/field index.
     */
    handleUpdateFieldValue = (field, fieldIndex, sectionIndex, rowIndex) =>
        async (e) => {
            const getFieldValue = getValueHandlerForField(field);
            const value = await getFieldValue(e);
            
            this.setState(prevState => {
                let updatedForm = { ...prevState.form };
                
                // locate the field config object, by row/section/field indexes
                updatedForm.fields.rows[rowIndex].sections[sectionIndex].fields[fieldIndex].value = value;
                
                return {
                    form: updatedForm
                };
            });
        }
    
    handleSubmit = () => {
        this.props.onSubmit(this.state.form);
    }
    
    /**
     * Determines the type of component that is required to render `field`.
     * Also gathers the required props associated with that field, and combines with the component.
     * @param {Object} field - single field configuration object
     */
    renderField = (field, fieldIndex, sectionIndex, rowIndex) => {
        const FieldComponent = getComponentForField(field);
        const fieldProps = getPropsForField(field);
        
        return (
            <FieldComponent
                key={ `${ field.name }${ fieldIndex }${ sectionIndex }` }
                { ...fieldProps }
                readOnly={ this.props.readOnly }
                onChange={ this.handleUpdateFieldValue(field, fieldIndex, sectionIndex, rowIndex) }
            />
        );
    }
    
    /**
     * Renders a section of fields as a `Fieldset`.
     * @param {Object} section - represents a fieldset definition, containing a name (legend) and
     *  an array of field configuration objects
     */
    renderSection = (section, sectionIndex, rowIndex) => {
        return (
            <Fieldset key={ `${ section.name }${ sectionIndex }` } title={ section.name } fluid={ section.fluid }>
                { section.fields.map((field, fieldIndex) => {
                    return this.renderField(field, fieldIndex, sectionIndex, rowIndex);
                }) }
            </Fieldset>
        );
    }
    
    /**
     * Clones a section and its fields by explicitly copying each, and returning.
     * @param {Object} section - original section that needs to be cloned
     */
    cloneSection(section) {
        // overwrite `value` as it will carry over from the original
        let fields = section.fields.map(field => ({
            ...field,
            value: null,
        }));
        
        // Disabled cloneable so that the clone does not output the option to clone itself.
        return {
            ...section,
            cloned: true,
            cloneable: false,
            fields: fields,
        };
    }
    
    /**
     * Injects a cloned section into its own row.
     * Because we are using section and field indexes to 'key' the section and field components, we attach
     *  the cloned section at the end of the section list, for a new index. When we inject in the middle of
     *  the array, even though indexes are recalculated, the keys on the components are not, resulting in the
     *  wrong inputs being updated when changed.
     * @param {number} rowIndex - row address of the section
     * @param {Object} section - section to clone
     */
    injectClonedFields(rowIndex, section) {
        let newState = { ...this.state };
        newState.form.fields.rows[rowIndex].sections.push(this.cloneSection(section));
        this.setState({ form: newState.form });
    }
    
    /**
     * For a single row, loop through all sections to find the `cloneable` ones, and output a list
     *  of clone actions for each appliable section.
     * @param {Object} row - Single row object from the field config
     */
    renderCloneSectionActions(row, rowIndex) {
        return row.sections.map((section, sectionIndex) => {
            if (!section.cloneable) {
                return null;
            }
            
            return (
                <FormAction
                    key={ sectionIndex }
                    actionLabel={ 'Add' }
                    secondary
                    message={ `Add ${ section.name }` }
                    onClick={ () => this.injectClonedFields(rowIndex, section, sectionIndex) }
                />
            );
        });
    }
    
    /**
     * Renders a row of sections as a `FormRow`. If any sections are `cloneable`, add the form action to clone after
     *  the end of its row.
     * @param {Object} row - A 'logical row' of sections containing field configuration objects
     * @param {Number} index - Row index
     */
    renderRow = (row, rowIndex) => {
        const formName = this.props.fields.name;
        return (
            <Fragment key={ `${ rowIndex }${ formName }` }>
                <FormRow fluid={ row.fluid }>
                    { row.sections.map((section, sectionIndex) => {
                        return this.renderSection(section, sectionIndex, rowIndex);
                    }) }
                </FormRow>
                { this.renderCloneSectionActions(row, rowIndex) }
            </Fragment>
        );
    }
    
    renderSubmitAction() {
        const { submitLabel, submitSecondary, submitFloating, submitHidden } = this.props;
        return (
            <FormAction
                actionLabel={ submitLabel }
                onClick={ this.handleSubmit }
                loading={ this.props.submitted }
                secondary={ submitSecondary }
                floating={ submitFloating }
                hidden={ submitHidden }
            />
        );
    }
    
    render() {
        // problem is that fields are being rendered from state and not props
        const { fields } = this.state.form;
        
        return (
            <>
                { fields.rows.map(this.renderRow) }
                { this.renderSubmitAction() }
            </>
        );
    }
}

FormBuilder.defaultProps = {
    onSubmit: () => console.info('FormBuilder: no onSubmit provided.'),
    submitLabel: 'Next'
};

FormBuilder.propTypes = {
    fields: shape({
        rows: arrayOf(shape({
            sections: arrayOf(shape({
                name: string,
                fields: array.isRequired,
            })).isRequired
        })).isRequired
    }).isRequired,
    onSubmit: func,
    submitLabel: string
};

export default FormBuilder;
