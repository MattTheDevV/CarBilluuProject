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
      {text && <span style={textStyle}>{text}</span>}
      {text && <div style={lineStyle}></div>}
      {!text && <div style={{ flex: 0 }}></div>} 
    </div>
  );
};

export default TextDivider;
