import React, { useState } from 'react';
import { Button, Modal, Badge } from 'react-bootstrap';

export default function Checkout(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* <Button variant="primary" onClick={() => setShow(true)}>
       Payconiq
      </Button> */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Je bestelling</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Bestel
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
}