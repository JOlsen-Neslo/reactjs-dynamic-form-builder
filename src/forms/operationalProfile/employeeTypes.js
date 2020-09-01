export default {
  name: 'Employee Types',
  rows: [
    {
      fluid: false,
      sections: [
        {
          name: 'Employee',
          fields: [
            {
              name: 'employee_Type',
              label: 'Define Role',
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Role',
            },
            {
              name: 'code',
              label: 'Define Code',
              fieldOrder: 1,
              type: 'text',
              placeholder: 'Enter Code',
            },
          ],
          fieldsetOrder: 0,
          fluid: true,
        },
      ],
    },
  ],
};
