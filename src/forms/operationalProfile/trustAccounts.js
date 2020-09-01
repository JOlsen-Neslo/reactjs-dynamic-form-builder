export default {
  name: 'Trust Accounts',
  rows: [
    {
      fluid: true,
      sections: [
        {
          name: 'Trust Account Name',
          fields: [
            {
              name: 'account_Name',
              label: null,
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Name',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
        },
        {
          name: 'Generic',
          fields: [
            {
              name: 'isGeneric',
              label: null,
              fieldOrder: 0,
              type: 'checkbox',
              placeholder: 'Is this a Generic Account?',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
        },
      ],
    },
    {
      fluid: true,
      sections: [
        {
          name: 'Bank',
          fields: [
            {
              name: 'bank_Type_No',
              label: null,
              fieldOrder: 0,
              type: 'select',
              placeholder: 'Select Bank',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
        },
        {
          name: 'Branch',
          fields: [
            {
              name: 'bank_Branch',
              label: null,
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Branch',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
        },
      ],
    },
    {
      fluid: true,
      sections: [
        {
          name: 'Routing ABA Number',
          fields: [
            {
              name: 'bank_Branch_Code',
              label: null,
              fieldOrder: 0,
              type: 'text',
              placeholder: '000 0000 0000 0000000',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
        },
        {
          name: 'Account Number',
          fields: [
            {
              name: 'account_No',
              label: null,
              fieldOrder: 0,
              type: 'text',
              placeholder: '000 0000 0000 0000000',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
        },
      ],
    },
    {
      fluid: false,
      sections: [
        {
          name: 'Account Type',
          fields: [
            {
              name: 'account_Type_No',
              label: null,
              fieldOrder: 0,
              type: 'select',
              placeholder: 'Select Account Type',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
        },
      ],
    },
  ],
};
