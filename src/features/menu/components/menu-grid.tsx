import Item from "./menu-item";
import { useMenu } from "../service/menuService";

export default function MenuGrid() {
  const { categorizedItems, incrementItem, decrementItem, resetItem } = useMenu();
  
  // Use categorizedItems directly as an object
  const grouped = categorizedItems;

  return (
    <>
      {Object.keys(grouped).map(category => (
        <section
          className="mt-6"
          id={category.toLowerCase()}
          key={category.toLowerCase()}
        >
          <div className="mb-2">
            <h2 className="text-2xl font-semibold uppercase">{category}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {grouped[category].map((item, idx) => (
              <Item
                key={idx}
                item={item}
                incrementItem={() => incrementItem(item)}
                decrementItem={() => decrementItem(item)}
                resetItem={() => resetItem(item)}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}