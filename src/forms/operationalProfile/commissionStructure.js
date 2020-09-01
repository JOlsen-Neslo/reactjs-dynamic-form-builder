export default {
  name: 'Commission Structure',
  rows: [
    {
      fluid: true,
      sections: [
        {
          name: 'Commission Setup',
          fields: [
            {
              name: 'client_Category_No',
              label: 'Select Debt Provider Category',
              fieldOrder: 0,
              type: 'select',
              placeholder: 'Select Category',
            },
            {
              name: 'branch_no',
              label: 'Select Company Branch',
              fieldOrder: 1,
              type: 'select',
              placeholder: 'Select Company Branch',
            },
          ],
          fieldsetOrder: 0,
          fluid: true,
          cloneable: false,
        },
      ],
    },
    {
      fluid: true,
      sections: [
        {
          name: 'Collect Debt on',
          fields: [
            {
              name: 'currency_No',
              label: 'Select Currency',
              fieldOrder: 0,
              type: 'select',
              placeholder: 'Select Currency',
            },
            {
              name: 'all_or_Portion',
              label: 'Commission is calculated on',
              fieldOrder: 1,
              type: 'select',
              placeholder: 'Partial / All of Collected Amount',
            },
            {
              name: 'age_Min',
              label: 'Minimum Age [Months]',
              fieldOrder: 2,
              type: 'text',
              placeholder: '0 [Months]',
            },
            {
              name: 'age_Max',
              label: 'Maximum Age [Months]',
              fieldOrder: 3,
              type: 'text',
              placeholder: '1 [Months]',
            },
            {
              name: 'below_Perc',
              label: 'Percentage Commission below Target Earned',
              fieldOrder: 3,
              type: 'text',
              placeholder: '0.00%',
            },
            {
              name: 'limit_Amount',
              label: 'Commission Ceiling',
              fieldOrder: 4,
              type: 'text',
              placeholder: '$0.00',
            },
            {
              name: 'allowance_Amount',
              label: 'Additional Allowance 1',
              fieldOrder: 5,
              type: 'text',
              placeholder: '$0.00',
            },
            {
              name: 'incentive_Perc',
              label: 'Incentive Percentage on Target',
              fieldOrder: 6,
              type: 'text',
              placeholder: '0.00%',
            },
          ],
          fieldsetOrder: 1,
          fluid: false,
          cloneable: false,
        },
      ],
    },
    {
      fluid: true,
      sections: [
        {
          name: 'Level 1 Commission',
          fields: [
            {
              name: 'level1_Amount',
              label: 'Collection Target',
              fieldOrder: 0,
              type: 'text',
              placeholder: '$0.00',
            },
            {
              name: 'level1_Perc',
              label: 'Collection Target Percentage',
              fieldOrder: 1,
              type: 'text',
              placeholder: '0.00%',
            },
          ],
          fieldsetOrder: 2,
          fluid: false,
          cloneable: false,
        },
      ],
    },
    {
      fluid: true,
      sections: [
        {
          name: 'Level 2 Commission',
          fields: [
            {
              name: 'level2_Amount',
              label: 'Collection Target',
              fieldOrder: 0,
              type: 'text',
              placeholder: '$0.00',
            },
            {
              name: 'level2_Perc',
              label: 'Collection Target Percentage',
              fieldOrder: 1,
              type: 'text',
              placeholder: '0.00%',
            },
          ],
          fieldsetOrder: 3,
          fluid: false,
          cloneable: false,
        },
      ],
    },
    {
      fluid: true,
      sections: [
        {
          name: 'Level 3 Commission',
          fields: [
            {
              name: 'level3_Amount',
              label: 'Collection Target',
              fieldOrder: 0,
              type: 'text',
              placeholder: '$0.00',
            },
            {
              name: 'level3_Perc',
              label: 'Collection Target Percentage',
              fieldOrder: 1,
              type: 'text',
              placeholder: '0.00%',
            },
          ],
          fieldsetOrder: 4,
          fluid: false,
          cloneable: false,
        },
      ],
    },
    {
      fluid: true,
      sections: [
        {
          name: 'Level 4 Commission',
          fields: [
            {
              name: 'level4_Amount',
              label: 'Collection Target',
              fieldOrder: 0,
              type: 'text',
              placeholder: '$0.00',
            },
            {
              name: 'level4_Perc',
              label: 'Collection Target Percentage',
              fieldOrder: 1,
              type: 'text',
              placeholder: '0.00%',
            },
          ],
          fieldsetOrder: 5,
          fluid: false,
          cloneable: false,
        },
      ],
    },
  ],
};
