import MenuNav from "./features/menu/components/menu-nav";
import Footer from "./components/footer";
import OrderDialog from "./components/order-dialog";
import MenuGrid from "./features/menu/components/menu-grid";
import { useMenu } from "./features/menu/service/menuService";

function App() {
  const {
    menuItems,
    total,
    filter,
    setFilter,
    incrementItem,
    decrementItem,
    resetItem,
    groupedItems,
  } = useMenu();

  const grouped = groupedItems();

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

      <MenuNav categories={Object.keys(grouped)} setFilter={setFilter} />
      <main className="container mx-auto min-h-screen px-4" id="main">
        {Object.keys(grouped).length === 0 && (
          <div className="flex flex-col justify-center items-center my-20 w-full">
            <h2 className="text-muted text-2xl mb-4">Geen resultaten</h2>
            <img
              src="assets/dorst.png"
              className="w-1/2 max-w-md"
              alt="Geen resultaten"
            />
          </div>
        )}
        <MenuGrid
          grouped={grouped}
          increment={incrementItem}
          decrement={decrementItem}
          reset={resetItem}
        />
      </main>
      {total > 0 ? (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg h-24 flex items-center z-50">
          <div className="container mx-auto flex justify-end px-4">
            <OrderDialog
              items={menuItems}
              increment={incrementItem}
              decrement={decrementItem}
            />
          </div>
        </nav>
      ) : null}
      <Footer />
    </>
  );
}

export default App;
