import MenuNav from "./features/menu/components/menu-nav";
import Footer from "./components/footer";
import OrderDialog from "./components/order-dialog";
import MenuGrid from "./features/menu/components/menu-grid";
import { useMenu } from "./features/menu/service/menuService";

function App() {
  const {
    total,
    categorizedItems,
    setFilter,
    incrementItem,
    decrementItem,
    resetItem,
    filter,
  } = useMenu();


  return (
    <>
      <div className="container mx-auto px-4">
        {/* <img
          className="rounded shadow mb-4"
          src="https://cafehettolhuis.nl/wp/wp-content/uploads/cafe-t-tolhuis-hilversum-slider-3.jpg"
          alt="Cafe"
        /> */}
        <h1 className="mt-3 text-3xl font-bold uppercase">Cafeke</h1>
        <p className="text-lg text-gray-600">Cafeke</p>
      </div>
      <MenuNav
        categories={Object.keys(categorizedItems)}
        setFilter={setFilter}
        filter={filter}
      />
      <main className="container mx-auto min-h-screen px-4" id="main">
        <MenuGrid
          categorizedItems={categorizedItems}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
          resetItem={resetItem}
        />
      </main>
      {total > 0 && (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg h-24 flex items-center z-50">
          <div className="container mx-auto flex justify-end px-4">
            <OrderDialog/>
          </div>
        </nav>
      )}
      <Footer />
    </>
  );
}

export default App;
