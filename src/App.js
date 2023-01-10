import React from 'react';
import './App.css';

import menu from "./menu.json"
import { Button, Badge, Container, Table, Row, Navbar,Nav, Modal, Image } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Item from './item';
import Link from 'react-scroll'

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

  getGroupedItems(){
    return this.state.menu_items.reduce((group, item, index) => {
      if(!group[item.category]){
        group[item.category] = []
      }
      item.id = index
      group[item.category].push(item);
      return group;
    }, {});
  }

  incrementItem(i){
    
    const items = this.state.menu_items.slice();
    items[i].amount ++
    this.setState({
      menu_items: items,
      total: this.state.total + 1,
    })
  }

  decrementItem(i){
    const items = this.state.menu_items.slice();
    if(items[i].amount > 0){
      items[i].amount --
      this.setState({
        menu_items: items,
        total: this.state.total - 1,
      })
    }
  }

  showBasket(visible){
    this.setState({
      showBasket: visible
    })
  }

  render() {
    const grouped = this.getGroupedItems()
    return (
        <BrowserRouter>
          <Image thumbnail
            src="https://cafehettolhuis.nl/wp/wp-content/uploads/cafe-t-tolhuis-hilversum-slider-3.jpg"
          />
          <h1>Cafeke</h1>
          <Navbar bg="light" variant="pills" sticky="top" className='py-0'>
            <Container fluid>
              <Nav>
              {Object.keys(grouped).map(category => (
                  <Nav.Link active="true"><HashLink to={"#" + category.toLowerCase()} activeClassName="selected">
                   {category}
                  </HashLink></Nav.Link>
              ))}
              </Nav>
            </Container>
          </Navbar>
        <Container className="mt-3" style={{ paddingBottom: this.state.total > 0? "7em": "0"}}>
          {Object.keys(grouped).map(category => (
            <section  id={category.toLowerCase()}>
              <Image thumbnail style={{height: "6em", width:"100vw"}}
              src='https://d2j6dbq0eux0bg.cloudfront.net/images/29466296/1759355392.jpg'/>
              <Row>
                <h2>{category}</h2>
                <Table striped>
                  <tbody>
                    {grouped[category].map(item => (
                      <Item key={item.id}
                        item={item}
                        increment={() => this.incrementItem(item.id)}
                        decrement={() => this.decrementItem(item.id)}
                      />
                    ))}
                  </tbody>
                </Table>
              </Row>
            </section>
            ))}
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
        </BrowserRouter>
    );
  }
}

export default App;