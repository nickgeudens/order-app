import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Basket(props) {
  const [show, setShow] = useState(false);
  return (
    <Modal
    show={this.state.showBasket}
    onHide={() => this.showBasket(false)}
    fullscreen={true}
  >
    <Modal.Header closeButton>
      <Modal.Title>Je bestelling</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {this.state.menu_items.map((item) =>
        item.amount > 0 ? (
          <div key={item.id}>
            <h5>
              {item.name} <Badge bg="primary">{item.amount}</Badge>
            </h5>
            <h6>€{(item.price * item.amount).toFixed(2)}</h6>
          </div>
        ):<></>
      )}
    </Modal.Body>
    <Modal.Footer>
      <h4>
        €{this.state.menu_items
          .map((item) => item.amount * item.price)
          .reduce((partialSum, a) => partialSum + a, 0)
          .toFixed(2)}
      </h4>
      <Button variant="primary" onClick={() => this.showBasket(false)}>
        Bestel
      </Button>
    </Modal.Footer>
  </Modal>
  );
}