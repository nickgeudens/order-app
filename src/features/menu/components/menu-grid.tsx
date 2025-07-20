import type { MenuItem } from "../../../types";
import MenuSection from "./menu-section";

interface MenuGridProps {
  grouped: { [category: string]: MenuItem[] };
  increment: (item: MenuItem) => void;
  decrement: (item: MenuItem) => void;
  reset: (item: MenuItem) => void;
}

export default function MenuGrid({
  grouped,
  increment,
  decrement,
  reset,
}: MenuGridProps) {
  return (
    <>
      {Object.keys(grouped).map(category => (
        <MenuSection
          key={category}
          category={category}
          items={grouped[category]}
          increment={increment}
          decrement={decrement}
          reset={reset}
        />
      ))}
    </>
  );
}
