import MenuNav from "./features/menu/components/menu-nav";
import Footer from "./components/footer";
import MenuOrder from "./features/menu/components/menu-order";
import MenuGrid from "./features/menu/components/menu-grid";
import { MenuProvider } from "./features/menu/service/menuService";

export default function App() {
  return (
    <MenuProvider>
      <div className="container mx-auto px-4">
        {/* <img
          className="rounded shadow mb-4"
          src="https://cafehettolhuis.nl/wp/wp-content/uploads/cafe-t-tolhuis-hilversum-slider-3.jpg"
          alt="Cafe"
        /> */}
        <h1 className="mt-3 text-3xl font-bold uppercase">Cafeke</h1>
        <p className="text-lg text-gray-600">Cafeke</p>
      </div>
      <MenuNav />
      <main className="container mx-auto min-h-screen px-4" id="main">
        <MenuGrid />
      </main>
      <MenuOrder />
      <Footer />
    </MenuProvider>
  );
}