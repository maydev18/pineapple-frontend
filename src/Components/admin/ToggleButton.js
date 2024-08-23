import React, { useState } from 'react';
import styles from './Dashboard.module.css'

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ToggleButton;
