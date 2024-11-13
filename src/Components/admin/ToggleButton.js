import React, { useState } from 'react';
import styles from './Dashboard.module.css'
import { useAuth } from '../../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import { useError } from '../../context/ErrorContext';
const ToggleButton = ({on , id , top}) => {
  const [isToggled, setIsToggled] = useState(on === true ? true : false);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const {isLoggedIn , token} = useAuth();
  const {showError} = useError();
  const handleToggle = async () => {
    try {
      const userConfirmed = window.confirm("Are you sure?");
      if (userConfirmed) {
        let url = `${process.env.REACT_APP_BASE_URL}admin/toggle-visibility/${id}`
        if(top){
          url = `${process.env.REACT_APP_BASE_URL}admin/toggle-top-product/${id}`
        }
        const res = await fetch(url , {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        if (!res.ok) {
          const err = await res.json();
          throw err;
        }
        setIsToggled(!isToggled);
      }
    } catch (err) {
      showError(err.message , 'danger');
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
