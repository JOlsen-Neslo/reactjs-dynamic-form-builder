export default {
  name: 'Credit Cards',
  rows: [
    {
      fluid: false,
      sections: [
        {
          name: 'Credit Card Merchant',
          fields: [
            {
              name: 'provider',
              label: 'Service Provider',
              fieldOrder: 0,
              type: 'text',
              placeholder: 'Enter Service Provider Name',
            },
            {
              name: 'merchant_Key',
              label: 'Merchant Key',
              fieldOrder: 1,
              type: 'text',
              placeholder: '000 0000 0000 0000000',
            },
            {
              name: 'api_Key',
              label: 'API Key',
              fieldOrder: 2,
              type: 'text',
              placeholder: '000 0000 0000 0000000',
            },
            {
              name: 'username',
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
            {
              name: 'url',
              label: 'URL',
              fieldOrder: 5,
              type: 'text',
              placeholder: 'Enter URL',
            },
          ],
          fieldsetOrder: 0,
          fluid: false,
        },
      ],
    },
  ],
};
