import React, { useState } from 'react';
import styles from './Dashboard.module.css'
import { Spinner } from 'react-bootstrap';
import { getAuthToken } from '../../utils/Auth';
const ToggleButton = ({visible , id}) => {
  console.log(visible);
  const [isToggled, setIsToggled] = useState(visible === true ? true : false);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const handleToggle = async () => {
    try {
      const userConfirmed = window.confirm("Are you sure?");
      if (userConfirmed) {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}admin/toggle-visibility/${id}`, {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + getAuthToken()
          }
        });
  
        if (!res.ok) {
          throw new Error('Failed to toggle visibility');
        }
  
        setIsToggled(!isToggled);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isToggled} onChange={handleToggle} disabled = {isSubmitting} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ToggleButton;
