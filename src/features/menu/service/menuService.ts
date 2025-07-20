import { useEffect, useState } from "react";
import menu from "./menu.json";
import type { MenuItem } from "@/types";

export function useMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setMenuItems(
      menu.map((item, idx: number) => ({
        ...item,
        amount: 0,
        id: idx,
      }))
    );
  }, []);

  const incrementItem = (item: MenuItem) => {
    setMenuItems(items => {
      const updated = items.map(i =>
        i.id === item.id ? { ...i, amount: i.amount + 1 } : i
      );
      setTotal(t => t + 1);
      return updated;
    });
  };

  const decrementItem = (item: MenuItem) => {
    setMenuItems(items => {
      const updated = items.map(i =>
        i.id === item.id && i.amount > 0 ? { ...i, amount: i.amount - 1 } : i
      );
      setTotal(t => (item.amount > 0 ? t - 1 : t));
      return updated;
    });
  };

  const resetItem = (item: MenuItem) => {
    setMenuItems(items => {
      const updated = items.map(i =>
        i.id === item.id ? { ...i, amount: 0 } : i
      );
      setTotal(t => t - item.amount);
      return updated;
    });
  };

  const groupedItems = () => {
    const filtered = menuItems.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered.reduce((group: { [category: string]: MenuItem[] }, item) => {
      if (!group[item.category]) group[item.category] = [];
      group[item.category].push(item);
      return group;
    }, {});
  };

  return {
    menuItems,
    total,
    filter,
    setFilter,
    incrementItem,
    decrementItem,
    resetItem,
    groupedItems,
  };
}
