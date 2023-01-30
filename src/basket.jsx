import React, { useState } from 'react';
import { Button, Modal, Badge } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Checkout from './checkout.jsx'
import GooglePayButton from '@google-pay/button-react'

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
        Je bestelling <Badge className='mx-2' bg="secondary">{total}</Badge>
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
              <>
                <div key={item.id} className="d-flex justify-content-between align-items-center pb-2">
                  <div className='d-flex align-items-center'>
                    <Badge pill bg="primary" className='mx-3'>
                          {item.amount}
                        </Badge>
                    <div>
                      <h5>
                         {item.name}
                      </h5>
                      <h6>€{(item.price * item.amount).toFixed(2)}</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <Badge
                      pill bg="light"
                      onClick={() => props.decrement(item)}
                      className='badge-hover nav-batch m-2'>
                      <FaMinus />
                    </Badge>
                    <Badge
                      pill bg="dark"
                      onClick={() => props.increment(item)}
                      className='badge-hover nav-batch'>
                      <FaPlus />
                    </Badge>
                  </div>
                </div>
                <hr className="hr my-2" />
              </>
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