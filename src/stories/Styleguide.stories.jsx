import React from 'react';

import './stories.scss';

export default {
  title: 'Styleguide',
};

const primaryColours = ['dark-blue', 'yellow', 'orange', 'red', 'purple', 'blue', 'turquoise', 'white'];
const greyColours = ['lighter', 'light', 'medium', 'dark'];

const ColourList = ({ title, colours }) => (
  <>
    <h2>{ title }</h2>
    <div className="color-list">
      { colours.map((color) => <div key={color} className={`color color--${color}`} />)}
    </div>
  </>
);

export const Colours = () => (
  <div style={{ padding: '4rem' }}>
    <ColourList title="Primary" colours={primaryColours} />
    <br />
    <ColourList title="Grey" colours={greyColours} />
  </div>
);

export const Typography = () => (
  <div style={{ padding: '4rem' }}>
    <h1>h1 Headline</h1>
    <br />
    <h2>h2 Sub Headline</h2>
    <br />
    <h3>h3 Content Headline</h3>
    <br />
    <p>p Body Text</p>
  </div>
);
