import React from 'react';

const TextDivider = ({ text }) => {
  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '20px 0', // Adds vertical spacing for visibility
  };

  const lineStyle = {
    content: '""',
    flex: 1,
    height: '1px',
    background: 'gray',
    margin: '0 10px',
  };

  const textStyle = {
    whiteSpace: 'nowrap',
  };

  return (
    <div style={dividerStyle}>
      <div style={lineStyle}></div>
      <span style={textStyle}>{text}</span>
      <div style={lineStyle}></div>
    </div>
  );
};

export default TextDivider;
