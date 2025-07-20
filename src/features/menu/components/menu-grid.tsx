import Item from "./menu-item";

interface MenuGridProps {
  categorizedItems: { [category: string]: any[] };
  incrementItem: (item: any) => void;
  decrementItem: (item: any) => void;
  resetItem: (item: any) => void;
}

export default function MenuGrid({
  categorizedItems,
  incrementItem,
  decrementItem,
  resetItem,
}: MenuGridProps) {
  return (
    <>
      {Object.keys(categorizedItems).length === 0 && (
        <div className="flex flex-col justify-center items-center my-20 w-full">
          <h2 className="text-muted text-2xl mb-4">Geen resultaten</h2>
          <img
            src="assets/dorst.png"
            className="w-1/2 max-w-md"
            alt="Geen resultaten"
          />
        </div>
      )}
      {Object.entries(categorizedItems).map(([category, items]) => (
        <section
          className="mt-6"
          id={category.toLowerCase()}
          key={category.toLowerCase()}
        >
          <div className="mb-2">
            <h2 className="text-2xl font-semibold uppercase">{category}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, idx) => (
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