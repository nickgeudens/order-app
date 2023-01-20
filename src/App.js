import React from "react";
import "./App.css";

import menu from "./menu.json";
import { Button, Badge, Container, Row, Navbar, Modal } from "react-bootstrap";
import Item from "./item";
import CategoryNavbar from "./navbar";
import EmptyPage from "./empty";
import Footer from "./footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialMenuItems = menu.map((item) => {
      item.amount = 0;
      return item;
    });
    this.state = {
      menu_items: initialMenuItems,
      total: 0,
      showBasket: false,
      filter: "",
    };
  }

  getGroupedItems() {
    const items = this.state.menu_items
      .slice()
      .filter((item) =>
        item.name.toLowerCase().includes(this.state.filter.toLowerCase())
      );

    return items.reduce((group, item, index) => {
      if (!group[item.category]) {
        group[item.category] = [];
      }
      item.id = index;
      group[item.category].push(item);
      return group;
    }, {});
  }

  incrementItem(item) {
    const items = this.state.menu_items.slice();
    let i = items.indexOf(item);
    items[i].amount++;
    this.setState({
      menu_items: items,
      total: this.state.total + 1,
    });
  }

  decrementItem(item) {
    const items = this.state.menu_items.slice();
    let i = items.indexOf(item);
    if (items[i].amount > 0) {
      items[i].amount--;
      this.setState({
        menu_items: items,
        total: this.state.total - 1,
      });
    }
  }

  showBasket(visible) {
    this.setState({
      showBasket: visible,
    });
  }

  setFilter(filter) {
    this.setState({
      filter: filter,
    });
  }

  render() {
    const grouped = this.getGroupedItems();
    return (
      <>
        <Container>
          {/* <Image thumbnail
            src="https://cafehettolhuis.nl/wp/wp-content/uploads/cafe-t-tolhuis-hilversum-slider-3.jpg"
          /> */}
          <h1 className="mt-3">Cafeke</h1>
          <p>Cafeke</p>
        </Container>

        <CategoryNavbar
          categories={Object.keys(grouped)}
          setFilter={(filter) => this.setFilter(filter)}
        />
        <Container className="min-vh-100">
          {Object.keys(grouped).length === 0 ? <EmptyPage /> : <></>}
          {Object.keys(grouped).map((category) => (
            <section className="mt-3" id={category.toLowerCase()} key={category.toLowerCase()}>
              {/* <Image thumbnail style={{height: "6em", width:"100vw", overflow:"hidden"}}
              src='https://d2j6dbq0eux0bg.cloudfront.net/images/29466296/1759355392.jpg'/> */}
              <Row>
                <h2>{category}</h2>
                {grouped[category].map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    increment={() => this.incrementItem(item)}
                    decrement={() => this.decrementItem(item)}
                  />
                ))}
              </Row>
            </section>
          ))}
        </Container>
        {this.state.total > 0 ? (
          <Navbar
            fixed="bottom"
            expand="lg"
            bg="light"
            style={{ height: "6em" }}
          >
            <Container className="justify-content-end">
              <Button variant="primary" onClick={() => this.showBasket(true)}>
                bestellen <Badge bg="secondary">{this.state.total}</Badge>
                <span className="visually-hidden">bestelling</span>
              </Button>
            </Container>
          </Navbar>
        ) : <></>}

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
        <Footer/>
      </>
    );
  }
}

export default App;