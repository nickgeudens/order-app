import { Plus, Trash, Minus } from 'lucide-react';
import { Button } from './ui/button';

export interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  category: string;
  amount: number;
  unavailable?: boolean;
}

export interface ItemProps {
  item: MenuItem;
  increment: (item: MenuItem) => void;
  decrement: (item: MenuItem) => void;
  reset: (item: MenuItem) => void;
}

export default function Item(props: ItemProps) {
  const { item, increment, decrement } = props;
  return (
    <div className="relative w-full mb-2">
      <div className={`relative flex items-center border rounded-md ${
        item.unavailable ? 'saturate-0 brightness-90 pointer-events-none' : ''
      }`}>
        {/* Set a fixed height for the flex row */}
        <div className="flex flex-1 items-center h-[4.5rem]">
          <Button
            variant="ghost"
            className={`flex items-center flex-1 p-2 pr-6 text-left justify-start h-full rounded-md ${item.amount > 0 ? 'rounded-r-none' : ''} ${!item.unavailable ? 'hover:bg-gray-50 active:bg-gray-100' : ''}`}
            onClick={() => increment(item)}
            disabled={item.unavailable}
          >
            <div className="flex m-3 h-[3rem] w-[3rem] relative align-middle">
              <img
                className="max-w-[3rem] max-h-[3rem] rounded object-contain"
                src={item.picture}
                alt={item.name}
              />
              {item.amount > 0 ? (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-2 py-1 text-xs font-bold">
                  {item.amount}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col m-2 flex-1">
              <p className="m-0 font-bold">{item.name}</p>
              <p className="m-0 text-gray-500 text-sm">{item.description}</p>
              <p className="m-0 text-sm">€{item.price.toFixed(2)}</p>
            </div>
            <span
              className={`transition-all duration-200 ${item.amount > 0 ? 'mr-6' : ''}`}
            >
              <Plus className={item.unavailable ? 'opacity-20' : ''} />
            </span>
          </Button>
          {/* Minus button next to plus button if amount > 0 */}
          {item.amount > 0 && (
            <Button
              variant="destructive"
              className="h-full rounded-l-none rounded-r-md flex items-center p-0"
              onClick={(e) => {
                e.stopPropagation();
                decrement(item);
              }}
            >
              <Minus />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}