import MenuNav from "./features/menu/components/menu-nav";
import Footer from "./components/footer";
import MenuOrder from "./features/menu/components/menu-order";
import MenuGrid from "./features/menu/components/menu-grid";
import { MenuProvider } from "./features/menu/service/menuService";
import MenuHeader from "./features/menu/components/menu-header"; // add import

export default function App() {
  return (
    <MenuProvider>
      <MenuHeader />
      <MenuNav />
      <main className="container mx-auto min-h-screen px-4" id="main">
        <MenuGrid />
      </main>
      <MenuOrder />
      <Footer />
    </MenuProvider>
  );
}