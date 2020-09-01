export default {
  name: 'Linking Categories',
  rows: [
    {
      fluid: true,
      sections: [
        {
          name: 'Link Company Category to Company Product',
          fields: [
            {
              name: 'clientCategoryNo',
              label: null,
              fieldOrder: 0,
              type: 'select',
              placeholder: 'Select Company Category',
              // optionsFunction: 'retrieveCategories',
              // TODO: add a property for retrieving values for select
            },
            {
              name: 'clientGroupNo',
              label: null,
              fieldOrder: 0,
              type: 'select',
              placeholder: 'Select Company Product',
              // optionsFunction: 'retrieveProducts',
            },
          ],
          fieldsetOrder: 0,
          fluid: true,
          cloneable: false,
        },
      ],
    },
  ],
};
