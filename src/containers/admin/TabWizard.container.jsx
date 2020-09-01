/**
 * @module TabWizardContainer
 * @description
 * Performs tab form progression on a given set of tabs. For use in pages like
 *  CompanyProfile and OperationalProfile.
 * Will pass company form field data from reducer state to a FormBuilder for field
 *  rendering.
 * We can de-couple this further by removing the dependency on `company` state,
 *  which will happen when we encounter a wizard that is not related to company.
 * TODO: Move presentation logic to the presentational component, to neaten up this container.
 */

import React, { Component } from 'react';
import TabWizard from '../../components/admin/tabWizard/TabWizard';
import Loader from '../../components/loader/Loader';
import {
    convertBoolToInt,
    isNull,
    isUndefined
} from '../../tools/helpers';
import FormBuilder from '../../components/form/formBuilder/FormBuilder';
import {
    deleteCompanyEntry,
    findCompanyEntry,
    requestCompanyEntries,
    updateCompanyEntry,
    updateCompanyFields
} from '../../actions/company.actions';
import { getAccessTokenCookie } from '../../tools/auth';
import Button from '../../components/button/Button';

import { ReactComponent as IconEdit } from '../../images/icon-edit.svg';
import FormAction from '../../components/form/formAction/FormAction';

class TabWizardContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activeTab: 0,
            activeSubTab: 0,
            submitted: false,
            requestedCompanyFields: [],
            requestedEntries: [],
            updating: false,              // Tabs setup for view mode by default
            editing: false,               // Keeps track of whether we are in edit mode
            nearPageBottom: false,        // Keep in state when we are close to page bottom
            editingEntityId: null,        // Keeps track of the entity id to update in edit mode
        };
    }
    
    componentDidMount() {
        // always fetch entries, if entries are defined
        this.fetchActiveEntries();
        
    }
    
    componentDidUpdate(prevProps) {
        this.resetSubmittedState(prevProps);
        this.fetchActiveEntries();
    }
    
    get activeTabData() {
        const activeMainTab = this.props.tabs[this.state.activeTab];
        return activeMainTab.hasOwnProperty('subtabs') ? activeMainTab.subtabs[this.state.activeSubTab] : activeMainTab;
    }
    
    get subtabCount() {
        return this.props.tabs[this.state.activeTab].subtabs.length;
    }
    
    get isSubTab() {
        return this.props.tabs[this.state.activeTab].hasOwnProperty('subtabs');
    }
    
    /**
     * Gets the existing objects associated with the active tab.
     */
    fetchActiveEntries() {
        const { dispatch, company } = this.props;
        const { label, entryName, shouldFetchEntries } = this.activeTabData;
        
        if (!this.state.requestedEntries.includes(label) && shouldFetchEntries(1, company)) {
            this.setState(prevState => ({
                requestedEntries: [...prevState.requestedEntries, label]
            }), () => {
                dispatch(requestCompanyEntries(getAccessTokenCookie(), entryName, 1, label))
            });
        }
    }
    
    /**
     * TODO: Modify reducer to contain submitted state for each form.
     * If the companyUpdateSuccess prop has changed from `null` to something else,
     *  reset `submitted` state, to allow follow up update requests.
     */
    resetSubmittedState(prevProps) {
        if (isNull(prevProps.company.companyUpdateSuccess) && !isNull(this.props.company.companyUpdateSuccess)) {
            this.setState({ submitted: false });
        }
    }
    
    handleChangeTab = (tabIndex) => {
        // Won't move past available tabs, and inform when trying to do so
        if (tabIndex < this.props.tabs.length) {
            this.setState({
                activeTab: tabIndex,
                activeSubTab: 0,
                updating: false,
                editing: false,
                nearPageBottom: false,
                editingEntityId: null,
            });
        } else {
            console.info('No next tab!');
        }
    }
    
    handleChangeSubTab = (tabIndex) => {
        if (tabIndex < this.subtabCount) {
            this.setState({
                activeSubTab: tabIndex,
                updating: false,
                editing: false,
                nearPageBottom: false,
                editingEntityId: null,
            });
        } else {
            // no more subtabs, increment main tab
            console.info('No next sub tab!');
            this.handleChangeTab(this.state.activeTab + 1);
        }
    }
    
    /**
     * After successful API update request, decide what action to take.
     * If `getEntries` isn't defined on the tab, it means there is nothing to view, and we can move to the next tab.
     * Otherwise it means we have things to view, so 'forget' that we requested the entries, which triggers a re-fetch
     *  of the active tab's entries.
     * @param {string} label - tab label
     * @param {function} getEntries - getEntries function defined on the tab
     * @returns {function}
     */
    getAfterUpdateAction(label, getEntries) {
        if (isUndefined(getEntries)) {
            return () => this.handleChangeTab(this.state.activeTab + 1);
        } else {
            return () => {
                this.setState((prevState) => ({
                    requestedEntries: prevState.requestedEntries.filter(requestedEntry => requestedEntry !== label),
                    updating: false,
                    editing: false,
                    editingEntityId: null,
                }));
            };
        }
    }
    
    getAfterFindAction(getFields, entity, entityId) {
        this.mapEntityToFields(getFields(), entity);
        this.setState((prevState) => ({
            ...prevState,
            updating: true,
            editing: true,
            editingEntityId: entityId,
        }));
    }
    
    mapFieldsToEntity = (form) => {
        const entity = {};
        form.rows.forEach(row => row.sections
            .forEach(section => section.fields
                .forEach(field => entity[field.name] = convertBoolToInt(field.value))));
        
        return entity;
    };
    
    mapEntityToFields = (form, entity) => {
        form.rows.forEach(row => row.sections
            .forEach(section => section.fields
                .forEach(field => field.value = entity[field.name])));
    };
    
    handleUpdateCompanyDetails = (formData) => {
        if (!this.state.submitted) {
            const { dispatch, user } = this.props;
            const { label, entryName, getEntries } = this.activeTabData;
            
            this.setState({ submitted: true });
            
            dispatch(
                updateCompanyFields(
                    getAccessTokenCookie(),
                    user.companyId,
                    entryName,
                    label,
                    this.mapFieldsToEntity(formData.fields),
                    this.getAfterUpdateAction(label, getEntries)
                )
            );
        }
    };
    
    handleUpdateCompanyEntry = (formData) => {
        if (this.state.submitted) {
            return;
        }
        
        const { dispatch, user } = this.props;
        const { label, entryName } = this.activeTabData;
        
        this.setState({ submitted: true });
        
        dispatch(
            updateCompanyEntry(
                getAccessTokenCookie(),
                user.companyId,
                entryName,
                this.state.editingEntityId,
                label,
                this.mapFieldsToEntity(formData.fields),
                () => {
                    this.setState((prevState) => ({
                        requestedEntries: prevState.requestedEntries.filter(requestedEntry => requestedEntry !== label),
                        updating: false,
                        editing: false,
                        editingEntityId: null,
                    }));
                }
            )
        );
    };
    
    /// When the page detects scroll to the bottom, set state to show the submit button
    handleNearPageBottom = (nearPageBottom) => {
        if (this.state.nearPageBottom !== nearPageBottom) {
            this.setState({ nearPageBottom });
        }
    }
    
    getTabsWithCompletedState() {
        return this.props.tabs.map((tab) => ({
                ...tab,
                complete: tab.isComplete(this.props.company)
            })
        );
    }
    
    renderSubmitLabel = (getEntries) => {
        return this.state.editing ? 'Save' : isUndefined(getEntries) ? 'Next' : 'Add';
    };
    
    getOnSubmit = () => {
        return this.state.editing ? this.handleUpdateCompanyEntry : this.handleUpdateCompanyDetails;
    };
    
    renderActiveForm() {
        const { getFields, getEntries, addable } = this.activeTabData;
        const activeFormFields = getFields(this.props.company);
        
        // for addable() tabs, only render the form fields when in updating mode
        if (addable() && !this.state.updating) {
            return;
        }
        
        if (isUndefined(activeFormFields)) {
            return <Loader/>;
        }
        
        // if is a full page form (no entries to display), only make the submit button visible near the bottom
        const isSubmitHidden = isUndefined(getEntries) ? !this.state.nearPageBottom : false;
        
        return (
            <FormBuilder
                fields={ activeFormFields }
                onSubmit={ this.getOnSubmit() }
                submitted={ this.state.submitted }
                submitLabel={ this.renderSubmitLabel(getEntries) }
                submitSecondary={ !isUndefined(getEntries) }
                submitFloating={ isUndefined(getEntries) }
                submitHidden={ isSubmitHidden }
                readOnly={ !this.state.updating }
            />
        );
    }
    
    onDelete = (entryId) => () => {
        const { dispatch, user } = this.props;
        const { label, entryName, getEntries } = this.activeTabData;
        
        dispatch(deleteCompanyEntry(
            getAccessTokenCookie(),
            user.companyId,
            entryName,
            label,
            entryId,
            this.getAfterUpdateAction(label, getEntries)
        ));
    };
    
    onView = (entryId) => () => {
        const { dispatch, user } = this.props;
        const { label, entryName, getFields } = this.activeTabData;
        
        dispatch(findCompanyEntry(
            getAccessTokenCookie(),
            user.companyId,
            entryName,
            label,
            entryId,
            (entity) => this.getAfterFindAction(getFields, entity, entryId),
        ));
    };
    
    /** Determines it there are subtab's entries to display, or just normal tab entries. */
    renderEntries() {
        const { getEntries } = this.activeTabData;
        let entries, nextAction;
        
        if (isUndefined(getEntries)) {
            return;
        }
        entries = getEntries(this.props.company, this.onDelete, this.onView);
        
        nextAction = this.isSubTab ?
            () => this.handleChangeSubTab(this.state.activeSubTab + 1) :
            () => this.handleChangeTab(this.state.activeTab + 1);
        
        if (isUndefined(entries)) {
            return <Loader/>;
        }
        
        // when displaying entries, render a 'next' button below
        return (
            <>
                { entries }
                <FormAction
                    actionLabel={ 'Next' }
                    onClick={ nextAction }
                    floating
                    hidden={ !this.state.nearPageBottom }
                />
            </>
        );
    }
    
    renderEditAction() {
        const { editable, addable } = this.activeTabData;
        // don't display an 'update' action if a tab is not editable or addable
        if (!editable() && !addable()) {
            return;
        }
        
        const buttonLabel = addable() ? 'add' : 'edit';
        
        return (
            <Button
                label={ <><IconEdit/>{ buttonLabel }</> }
                medium
                light
                onClick={ () => this.setState({ updating: true }) }
            />
        );
    }
    
    render() {
        const { user, title, onLogout } = this.props;
        const { activeTab, activeSubTab } = this.state;
        
        return (
            <>
                <TabWizard
                    pageAction={ this.renderEditAction() }
                    title={ title }
                    user={ user }
                    tabs={ this.getTabsWithCompletedState() }
                    activeTab={ activeTab }
                    activeSubTab={ activeSubTab }
                    onChangeTab={ this.handleChangeTab }
                    onChangeSubTab={ this.handleChangeSubTab }
                    onNearPageBottom={ this.handleNearPageBottom }
                    onLogout={ onLogout }
                >
                    { this.renderActiveForm() }
                    { this.renderEntries() }
                </TabWizard>
            </>
        );
    }
}

export default TabWizardContainer;
