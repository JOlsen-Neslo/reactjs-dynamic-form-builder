import React from 'react';

import { isNull } from '../../../tools/helpers';

import CategoriesForm from '../../../forms/operationalProfile/categories';
import ProductsForm from '../../../forms/operationalProfile/companyProducts';
import LinkingCategoriesForm from '../../../forms/operationalProfile/linkingCategories';
import TrustAccountsForm from '../../../forms/operationalProfile/trustAccounts';
import CreditCardsForm from '../../../forms/operationalProfile/creditCards';
import CreditBureausForm from '../../../forms/operationalProfile/creditBureaus';
import DebitOrderProductsForm from '../../../forms/operationalProfile/debitOrderProducts';
import EmployeeTypesForm from '../../../forms/operationalProfile/employeeTypes';
import CommissionStructureForm from '../../../forms/operationalProfile/commissionStructure';

import Checkbox from '../../../components/checkbox/Checkbox';
import EntriesTable from '../../../components/admin/entriesTable/EntriesTable';

export const operationalProfileTabs = [
    {
        label: 'Categories',
        isComplete: () => false,
        subtabs: [
            {
                label: 'Categories',
                entryName: 'categories',
                getFields: () => CategoriesForm,
                isComplete: (company) => company.fields['Categories']?.complete,
                shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Categories'),
                getEntries: (company, onDeleteEntry, onViewEntry) => getCategoriesTable(company, onDeleteEntry, onViewEntry),
                editable: () => false,
                addable: () => true,
            },
            {
                label: 'Products',
                entryName: 'products',
                getFields: () => ProductsForm,
                isComplete: (company) => company.fields['Products']?.complete,
                shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Products'),
                getEntries: (company, onDeleteEntry, onViewEntry) => getProductsTable(company, onDeleteEntry, onViewEntry),
                editable: () => false,
                addable: () => true,
            },
            {
                label: 'Linking Categories',
                entryName: 'products',
                getFields: () => LinkingCategoriesForm,
                isComplete: (company) => company.fields['Linking Categories']?.complete,
                shouldFetchEntries: () => false,
                editable: () => false,
                addable: () => false,
            },
        ],
    },
    {
        label: 'Trust Accounts',
        entryName: 'trust-accounts',
        getFields: () => TrustAccountsForm,
        // isComplete: (company) => company.fields['Categories']?.complete,
        isComplete: () => false,
        shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Trust Accounts'),
        getEntries: (company, onDeleteEntry, onViewEntry) => getTrustAccountsTable(company, onDeleteEntry, onViewEntry),
        editable: () => false,
        addable: () => true,
    },
    {
        label: 'Service Providers',
        isComplete: () => false,
        subtabs: [
            {
                label: 'Credit Cards',
                entryName: 'credit-cards',
                getFields: () => CreditCardsForm,
                isComplete: (company) => company.fields['Credit Cards']?.complete,
                shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Credit Cards'),
                getEntries: (company, onDeleteEntry, onViewEntry) => getCreditCardsTable(company, onDeleteEntry, onViewEntry),
                editable: () => false,
                addable: () => true,
            },
            {
                label: 'Credit Bureaus',
                entryName: 'credit-bureaus',
                getFields: () => CreditBureausForm,
                isComplete: (company) => company.fields['Credit Bureaus']?.complete,
                shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Credit Bureaus'),
                getEntries: (company, onDeleteEntry, onViewEntry) => getCreditBureauTable(company, onDeleteEntry, onViewEntry),
                editable: () => false,
                addable: () => true,
            },
            {
                label: 'Debit Order Products',
                entryName: 'debit-order-products',
                getFields: () => DebitOrderProductsForm,
                isComplete: (company) => company.fields['Debit Order Products']?.complete,
                shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Debit Order Products'),
                getEntries: (company, onDeleteEntry, onViewEntry) => getDebitOrdersTable(company, onDeleteEntry, onViewEntry),
                editable: () => false,
                addable: () => true,
            }
        ],
    },
    {
        label: 'Employee Types',
        entryName: 'employee-types',
        getFields: () => EmployeeTypesForm,
        // isComplete: (company) => company.fields['Categories']?.complete,
        isComplete: () => false,
        shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Employee Types'),
        getEntries: (company, onDeleteEntry, onViewEntry) => getEmployeeTypesTable(company, onDeleteEntry, onViewEntry),
        editable: () => false,
        addable: () => true,
    },
    {
        label: 'Commission Structure',
        entryName: 'commission',
        getFields: () => CommissionStructureForm,
        // isComplete: (company) => company.fields['Categories']?.complete,
        isComplete: () => false,
        shouldFetchEntries: (companyId, company) => !isNull(companyId) && !company.entries.hasOwnProperty('Commission Structure'),
        getEntries: (company, onDeleteEntry, onViewEntry) => getCommissionTable(company, onDeleteEntry, onViewEntry),
        editable: () => false,
        addable: () => true,
    },
];

const formatCreditBureaus = (bureaus) => {
    return bureaus.map(bureau => {
        return {
            ...bureau,
            listing: <Checkbox centered readOnly checked={ bureau.listing }/>
        }
    });
};

const getCreditBureauTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Credit Bureaus')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Credit Bureaus'
            cols={ [
                { Header: 'Credit Bureaus', accessor: 'credit_Bureau' },
                { Header: 'Listing', accessor: 'listing' }
            ] }
            headerModifiers={ { listing: { center: true } } }
            rows={ formatCreditBureaus(company.entries['Credit Bureaus']) }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField='credit_Bureau_No'
            sortable={ false }
        />
    );
};

const getCreditCardsTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Credit Cards')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Credit Merchants'
            cols={ [
                { Header: 'Service Provider Name', accessor: 'provider' }
            ] }
            rows={ company.entries['Credit Cards'] }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField='cc_Portal_No'
            sortable={ false }
        />
    );
};

const getProductsTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Products')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Company Products'
            cols={ [
                { Header: 'Code', accessor: 'agency_Code' },
                { Header: 'Company Product', accessor: 'client_Group' }
            ] }
            rows={ company.entries['Products'] }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField={ 'client_Group_No' }
            sortable={ false }
        />
    );
};

const formatCategories = (categories) => {
    return categories.map(category => {
        return {
            ...category,
            is_Generic: <Checkbox centered readOnly checked={ category.is_Generic }/>
        }
    });
};

const getCategoriesTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Categories')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Categories'
            cols={ [
                { Header: 'Category', accessor: 'client_Category' },
                { Header: 'Generic', accessor: 'is_Generic' }
            ] }
            headerModifiers={ { is_Generic: { center: true } } }
            rows={ formatCategories(company.entries['Categories']) }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField='client_Category_No'
            sortable={ false }
        />
    );
};

/// For trust accounts, insert a checkbox in place of a boolean string.
/// (right now the generic field doesn't exist so we default it to false)
const formatTrustAccounts = (trustAccounts) => {
    return trustAccounts.map(account => {
        return {
            ...account,
            generic: <Checkbox centered readOnly checked={ false }/>
        }
    });
};

const getTrustAccountsTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Trust Accounts')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Trust Accounts'
            cols={ [
                { Header: 'Trust Account', accessor: 'account_Name' },
                { Header: 'Generic', accessor: 'generic' }, // temporary accessor while waiting for api attributes
                { Header: 'Routing ABA Number', accessor: 'bank_Branch_Code' }, // temporary accessor while waiting for api attributes
                { Header: 'Account Number', accessor: 'account_No' },
            ] }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField='bank_Acc_No'
            headerModifiers={ {
                generic: {
                    center: true,
                }
            } }
            rows={ formatTrustAccounts(company.entries['Trust Accounts']) }
        />
    );
};

const formatCommissionStructures = (structures) => {
    return structures.map(account => {
        return {
            ...account,
            setup: <Checkbox centered readOnly checked={ true }/> // there is no field to map this to on the API, default to checked
        }
    });
};

const getCommissionTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Commission Structure')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Commission Structures'
            cols={ [
                { Header: 'Category', accessor: 'client_Category_Name' },
                { Header: 'Commission Setup', accessor: 'setup' },
            ] }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField='client_Aging_No'
            rows={ formatCommissionStructures(company.entries['Commission Structure']) }
        />
    );
};

const getEmployeeTypesTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Employee Types')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Employee Types'
            cols={ [
                { Header: 'Code', accessor: 'code' },
                { Header: 'Employee Type', accessor: 'employee_Type' },
            ] }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField='employee_Type_No'
            rows={ company.entries['Employee Types'] }
        />
    );
};

const getDebitOrdersTable = (company, onDeleteEntry, onViewEntry) => {
    if (!company.entries.hasOwnProperty('Debit Order Products')) {
        return;
    }
    
    return (
        <EntriesTable
            title='Created Debit Order Products'
            cols={ [
                { Header: 'Product Name', accessor: 'product_Name' },
                { Header: 'Product Code', accessor: 'product_Code' },
            ] }
            onDeleteRow={ onDeleteEntry }
            onViewRow={ onViewEntry }
            idField='product_No'
            rows={ company.entries['Debit Order Products'] }
        />
    );
};
