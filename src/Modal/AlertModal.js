import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
       
        <Modal.Body style={{padding: 0}}>
        <Alert variant="danger" style={{padding: 0, margin:0} }>
        <p style={{color: "black"}}>
       Failed !
      </p>
    
     
  
      
    </Alert>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default Example;