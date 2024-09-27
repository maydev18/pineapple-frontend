import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './Modal.css'; // Custom styling if needed
import { useError } from '../context/ErrorContext';

function AlertModal() {
  const { error, type, hideError, visible } = useError();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        hideError();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, hideError]);

  return (
    <>
      {visible && (
        <div style={styles.alertContainer}>
          <Alert variant={type} >
            <p style={{ margin: 0, color: 'black', fontSize: '20px'}}>
              {error}!
            </p>
          </Alert>
        </div>
      )}
    </>
  );
}

// Inline styling to position the alert
const styles = {
  alertContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1050, // Ensures it appears above other elements
    width: 'auto', // Adjust the width of the alert as needed
  }
};

export default AlertModal;
