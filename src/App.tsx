import React from "react";

import menu from "./menu.json";
import Item from "./components/item";
import CategoryNavbar from "./components/navbar";
import EmptyPage from "./components/empty";
import Footer from "./components/footer";
import Basket from "./components/basket";

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
      filter: "",
    };
  }

  getGroupedItems() {
    const items = this.state.menu_items
      .slice()
      .filter((item) =>
        item.name.toLowerCase().includes(this.state.filter.toLowerCase()) || 
        item.category.toLowerCase().includes(this.state.filter.toLowerCase())
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

  incrementItem = (item) => {
    const items = this.state.menu_items.slice();
    let i = items.indexOf(item);
    items[i].amount++;
    this.setState({
      menu_items: items,
      total: this.state.total + 1,
    });
  }

  decrementItem = (item) => {
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
  resetItem = (item) => {
    const items = this.state.menu_items.slice();
    let i = items.indexOf(item);
    if (items[i].amount > 0) {
      let previous = items[i].amount
      items[i].amount = 0;
      this.setState({
        menu_items: items,
        total: this.state.total - previous,
      });
    }
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
        <div className="container mx-auto px-4">
          {/* <img
            className="rounded shadow mb-4"
            src="https://cafehettolhuis.nl/wp/wp-content/uploads/cafe-t-tolhuis-hilversum-slider-3.jpg"
            alt="Cafe"
          /> */}
          <h1 className="mt-3 text-3xl font-bold">Cafeke</h1>
          <p className="text-lg text-gray-600">Cafeke</p>
        </div>

        <CategoryNavbar
          categories={Object.keys(grouped)}
          setFilter={(filter) => this.setFilter(filter)}
        />
        <main className="container mx-auto min-h-screen px-4" id="main">
          {Object.keys(grouped).length === 0 ? <EmptyPage /> : null}
          {Object.keys(grouped).map((category) => (
            <section
              className="mt-6"
              id={category.toLowerCase()}
              key={category.toLowerCase()}
            >
              {/* <img className="rounded w-full h-24 object-cover mb-2" src='https://d2j6dbq0eux0bg.cloudfront.net/images/29466296/1759355392.jpg' alt="Category"/> */}
              <div className="mb-2">
                <h2 className="text-2xl font-semibold">{category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {grouped[category].map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    increment={() => this.incrementItem(item)}
                    decrement={() => this.decrementItem(item)}
                    reset={() => this.resetItem(item)}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
        {this.state.total > 0 ? (
          <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg h-24 flex items-center z-50">
            <div className="container mx-auto flex justify-end px-4">
              <Basket
                items={this.state.menu_items}
                increment={this.incrementItem}
                decrement={this.decrementItem}
              />
            </div>
          </nav>
        ) : null}
        <Footer />
      </>
    );
  }
}

export default App;
