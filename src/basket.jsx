import React, { useState } from 'react';
import { Button, ButtonGroup, Modal, Badge } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Basket(props) {
  const [show, setShow] = useState(false);

  const total = props.items
    .map((item) => item.amount)
    .reduce((partialSum, a) => partialSum + a, 0)
    .toFixed(0)
  const totalPrice = props.items
    .map((item) => item.amount * item.price)
    .reduce((partialSum, a) => partialSum + a, 0)
    .toFixed(2)
  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        bestellen <Badge bg="secondary">{total}</Badge>
        <span className="visually-hidden">bestelling</span>
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Je bestelling</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.items.map((item) =>
            item.amount > 0 ? (
              <div key={item.id} className="d-flex justify-content-between pb-2">
                <div>
                  <h5>
                    {item.name} <Badge bg="primary">{item.amount}</Badge>
                  </h5>
                  <h6>€{(item.price * item.amount).toFixed(2)}</h6>
                </div>

                <ButtonGroup>
                  <Button 
                    variant="danger"
                    onClick={() => props.decrement(item)}
                  ><FaMinus/></Button>
                  <Button 
                    variant="info"
                    onClick={()=>props.increment(item)}
                  ><FaPlus/></Button>
                </ButtonGroup>

              </div>
            ) : ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <h4>
            €{totalPrice}
          </h4>
          <Button variant="primary" onClick={() => setShow(false)}>
            Bestel
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
}