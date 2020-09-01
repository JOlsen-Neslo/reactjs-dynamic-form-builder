export default {
  name: 'Products',
  rows: [
    {
      fluid: true,
      sections: [
        {
          name: 'Company Product',
          fields: [
            {
              name: 'client_Group',
              label: null,
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Company Product',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
          cloneable: false,
        },
        {
          name: 'Provider Code',
          fields: [
            {
              name: 'agency_Code',
              label: null,
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Code',
              value: null,
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
