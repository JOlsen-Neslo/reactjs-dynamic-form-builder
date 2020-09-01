export default {
  name: 'Categories',
  rows: [
    {
      fluid: true,
      sections: [
        {
          name: 'Category Name',
          fields: [
            {
              name: 'client_Category',
              label: null,
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Name',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
          // cloneable: true, TODO: fix cloning process
        },
        {
          name: 'Generic',
          fields: [
            {
              name: 'is_Generic',
              label: null,
              fieldOrder: 0,
              type: 'checkbox',
              placeholder: 'Is this a Generic Category?',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
          // cloneable: true,
        },
      ],
    },
  ],
};
