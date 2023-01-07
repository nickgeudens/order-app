import React from 'react';
import './App.css';

import menu from "./menu.json"
import { ButtonGroup, Button,Badge, Container, Table, Row, Image, Navbar, Modal } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialMenuItems = menu.map(item => {
      item.amount = 0
      return item;
    })
    this.state = {
      menu_items: initialMenuItems,
      total: 0,
      showBasket: false
    };
  }

  groupItems(){
    const grouped = this.state.menu_items.reduce((group, item, index) => {
      if(!group[item.category]){
        group[item.category] = []
      }
      item.id = index
      group[item.category].push(item);
      return group;
    }, {});

    return Object.keys(grouped).map(category => (
      <Row>
      <h2>{category}</h2>
      <Table striped>
        <tbody>
          {grouped[category].map(item => (
            <tr key={item.index}>
            <td className="p-2">
                <Image
                  style={{ height: "4em" }}
                  thumbnail
                  src={item.picture}
                  >
                </Image>
              </td>
            <td className="p-2">
              {item.name}
            </td>
            <td className="p-2">
              €{item.price}
              <ButtonGroup className="me-2" aria-label="First group" size="sm">
                <Button variant="info" onClick={() => this.decrementItem(item.id)}><strong>-</strong></Button>
                <Button variant="secondary">{item.amount}</Button>
                <Button variant="info" onClick={() => this.incrementItem(item.id)}><strong>+</strong></Button>
              </ButtonGroup>
            </td>
          </tr>
          ))}
        </tbody>
      </Table>
    </Row>))
  }

  incrementItem(i){
    const items = this.state.menu_items.slice();
    items[i].amount ++
    this.setState({
      menu_items: items,
      total: this.state.total + 1,
      showBasket: this.state.showBasket
    })
  }

  decrementItem(i){
    const items = this.state.menu_items.slice();
    if(items[i].amount > 0){
      items[i].amount --
      this.setState({
        menu_items: items,
        total: this.state.total - 1,
        showBasket: this.state.showBasket
      })
    }
  }

  showBasket(visible){
    this.setState({
      showBasket: visible
    })
  }

  render() {
    return (
      <>
        <Container className="mt-3" style={{ paddingBottom: this.state.total > 0? "7em": "0" }}>
          {this.groupItems()}
        </Container>
        {this.state.total > 0?
          <Navbar 
            fixed="bottom"
            expand="lg"
            bg="light"
            style={{ height: "7em" }}>
            <Container>
            <Button variant="primary" onClick={() => this.showBasket(true)}>
              Je bestelling <Badge bg="secondary">{this.state.total}</Badge>
              <span className="visually-hidden">bestelling</span>
            </Button>
            </Container>
          </Navbar>:<></>}

          <Modal show={this.state.showBasket} onHide={() => this.showBasket(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Je bestelling</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.menu_items.map(item => 
                item.amount > 0?(
                <>
                <h5>{item.name} <Badge bg="primary">{item.amount}</Badge></h5>
                <h6>€{(item.price * item.amount).toFixed(2)}</h6>
                </>
                ):(<></>)
              )}
            </Modal.Body>
            <Modal.Footer>
              <h4>€{this.state.menu_items
                .map(item => item.amount * item.price)
                .reduce((partialSum, a) => partialSum + a, 0)
                .toFixed(2)}</h4>
              <Button variant="primary" onClick={() => this.showBasket(false)}>
                Bestel
              </Button>
            </Modal.Footer>
          </Modal>
      </>
    );
  }
}

export default App;