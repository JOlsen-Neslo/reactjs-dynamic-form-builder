export default {
  name: 'Debit Order Products',
  rows: [
    {
      fluid: true,
      sections: [
        {
          name: 'Credit Product',
          fields: [
            {
              name: 'product_Name',
              label: 'Debit Order Product Name',
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Name',
            },
            {
              name: 'product_Code',
              label: 'Debit Order Product Code',
              fieldOrder: 1,
              type: 'text',
              placeholder: '000 0000 0000 0000000',
            },
            {
              name: 'merchant_Number',
              label: 'Merchant Name',
              fieldOrder: 2,
              type: 'select',
              placeholder: 'Select Merchant',
            },
            {
              name: 'user_Name',
              label: 'Username',
              fieldOrder: 3,
              type: 'text',
              placeholder: 'Enter Username',
            },
            {
              name: 'password',
              label: 'Password',
              fieldOrder: 4,
              type: 'password',
              placeholder: 'Enter Password',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
          cloneable: false,
        },
        {
          name: 'Create Tracking',
          fields: [
            {
              name: 'default_Tracking_No',
              label: 'Default Tracking Number',
              fieldOrder: 0,
              type: 'text',
              placeholder: '000 0000 0000 0000000',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
          cloneable: false,
        },
        {
          name: 'Bank Details',
          fields: [
            {
              name: 'bank_Reference_Short_Code',
              label: 'Bank reference',
              fieldOrder: 0,
              type: 'text',
              placeholder: '000 0000 0000 0000000',
            },
            {
              name: 'currency_No',
              label: 'Currency',
              fieldOrder: 1,
              type: 'select',
              placeholder: 'Select Currency',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
          cloneable: false,
        },
        {
          name: 'Voice / Paper Mandate',
          fields: [
            {
              name: 'voice_Mandate',
              label: 'Voice Mandate',
              fieldOrder: 0,
              type: 'checkbox',
              placeholder: 'Voice Mandate',
            },
            {
              name: 'paper_Mandate',
              label: 'Paper Mandate',
              fieldOrder: 1,
              type: 'checkbox',
              placeholder: 'Paper Mandate',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
          cloneable: false,
        },
      ],
    },
  ],
};
