export default {
  name: 'Credit Bureaus',
  rows: [
    {
      fluid: false,
      sections: [
        {
          name: 'Credit Bureau Merchant',
          fields: [
            {
              name: 'credit_Bureau',
              label: 'Credit Bureau',
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Credit Bureau',
            },
            {
              name: 'listing',
              label: 'Listing',
              fieldOrder: 1,
              type: 'checkbox',
              placeholder: 'Is this Credit Bureau Listed?',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
        },
      ],
    },
  ],
};
