import React from "react";
import Item from "./menu-item";
import type { MenuItem } from "../../../types";

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
  increment: (item: MenuItem) => void;
  decrement: (item: MenuItem) => void;
  reset: (item: MenuItem) => void;
}

export default function MenuSection({
  category,
  items,
  increment,
  decrement,
  reset,
}: MenuSectionProps) {
  return (
    <section className="mt-6" id={category.toLowerCase()} key={category.toLowerCase()}>
      <div className="mb-2">
        <h2 className="text-2xl font-semibold uppercase">{category}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <Item
            key={item.id}
            item={item}
            increment={() => increment(item)}
            decrement={() => decrement(item)}
            reset={() => reset(item)}
          />
        ))}
      </div>
    </section>
  );
}
