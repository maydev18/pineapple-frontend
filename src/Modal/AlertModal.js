
import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useError } from '../context/ErrorContext';
import './Modal.css';

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
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >{visible && 
        <Modal
          show={!!error}
          onHide={hideError}
          backdrop={false}
         
        >
          <Modal.Body style={{ padding: 0 }}>
            <Alert variant={type} style={{ padding: 0, margin: 0 }}>
              <p style={{ color: 'black' }}>
                {error}
              </p>
            </Alert>
          </Modal.Body>
        </Modal>
      }</div>
    </>
  );
}

export default AlertModal;
