import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import menu from "./menu.json";
import type { MenuItem } from "@/types";

interface MenuContextType {
  menuItems: MenuItem[];
  total: number;
  totalPrice: number;
  filter: string;
  setFilter: (filter: string) => void;
  incrementItem: (item: MenuItem) => void;
  decrementItem: (item: MenuItem) => void;
  resetItem: (item: MenuItem) => void;
  categorizedItems: { [category: string]: MenuItem[] };
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuContextProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuContextProviderProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menu.map((item, idx: number) => ({
    ...item,
    amount: 0,
    id: idx,
  })));
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [categorizedItems, setCategorizedItems] = useState<{ [category: string]: MenuItem[] }>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const filtered = menuItems.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
    );
    const grouped = filtered.reduce((group: { [category: string]: MenuItem[] }, item) => {
      if (!group[item.category]) group[item.category] = [];
      group[item.category].push(item);
      return group;
    }, {});
    setCategorizedItems(grouped);

    const price = menuItems.reduce((sum, item) => sum + item.amount * item.price, 0);
    setTotalPrice(price);
    const totalCount = menuItems.reduce((sum, item) => sum + item.amount, 0);
    setTotal(totalCount);
  }, [menuItems, filter]);

  const incrementItem = (item: MenuItem) => {
    setMenuItems(items =>
      items.map(i =>
        i.id === item.id ? { ...i, amount: i.amount + 1 } : i
      )
    );
  };

  const decrementItem = (item: MenuItem) => {
    setMenuItems(items =>
      items.map(i =>
        i.id === item.id && i.amount > 0 ? { ...i, amount: i.amount - 1 } : i
      )
    );
  };

  const resetItem = (item: MenuItem) => {
    setMenuItems(items =>
      items.map(i =>
        i.id === item.id ? { ...i, amount: 0 } : i
      )
    );
  };

  return (
    <MenuContext.Provider value={{
      menuItems,
      total,
      totalPrice,
      filter,
      setFilter,
      incrementItem,
      decrementItem,
      resetItem,
      categorizedItems,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenuContext must be used within a MenuProvider");
  return context;
}
