import React from 'react';

const CustomArrow = (props) => {
  const { className, style, onClick, direction } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", borderRadius: "50%", padding: "1rem", zIndex: 2}}
      onClick={onClick}
    >
      {direction === 'left' ? '<' : '>'}
    </div>
  );
};

export default CustomArrow;

