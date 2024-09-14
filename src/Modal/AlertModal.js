import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useError } from '../context/ErrorContext';

function AlertModal() {
  const { error, type , hideError , visible} = useError();

  return (
    <>
    {visible && 
      <Modal show={!!error} onHide={hideError}>
        <Modal.Body style={{ padding: 0 }}>
          <Alert variant={type} style={{ padding: 0, margin: 0 }}>
            <p style={{ color: "black" }}>
              {error}
            </p>
          </Alert>
        </Modal.Body>
      </Modal>
    }
  </>  
  );
}

export default AlertModal;
