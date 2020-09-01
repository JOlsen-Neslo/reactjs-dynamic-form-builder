import React from 'react';

export const Padded = ({ width = 'auto', styles, children }) => (
  <div style={{ padding: '4rem', width, ...styles }}>
    {children}
  </div>
);

export const DarkBg = ({ children }) => (
  <div style={{ backgroundColor: '#232639' }}>
    {children}
  </div>
);

export const GreyBg = ({ children }) => (
  <div style={{ backgroundColor: '#F8F8F8' }}>
    {children}
  </div>
);

export const StoryHeading = ({ children }) => (
  <h5 className="story-heading">{children}</h5>
);
