import React from 'react';
import styles from './CustomArrow.module.css';

const CustomArrow = (props) => {
  const { className, style, onClick, direction } = props;
  const arrowClass = direction === 'left' ? styles.customPrevArrow : styles.customNextArrow;

  return (
    <div
      className={`${styles.customArrow} ${arrowClass}`}
      style={{ ...style, display: "block", background: "black", borderRadius: "50%", padding: "1rem", zIndex: 2}}
      onClick={onClick}
    >
      {direction === 'left' ? '<' : '>'}
    </div>
  );
};

export default CustomArrow;
