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
      <div className={`flex items-center border rounded-md overflow-hidden ${
        item.unavailable ? 'saturate-0 brightness-90 pointer-events-none' : ''
      }`}>
        <div className="flex flex-1 h-full min-w-0">
          <Button
            variant="ghost"
            className={`flex items-center flex-1 p-0 pr-6 text-left justify-start h-full rounded-md min-w-0 ${item.amount > 0 ? 'rounded-r-none' : ''} ${!item.unavailable ? 'hover:bg-gray-50 active:bg-gray-100' : ''}`}
            onClick={() => increment(item)}
            disabled={item.unavailable}
          >
            <div className="flex m-3 h-[3rem] w-[3rem] relative align-middle flex-shrink-0">
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
            <div className="flex flex-col m-2 flex-1 min-w-0">
              <p className="m-0 font-bold whitespace-normal leading-tight">{item.name}</p>
              <p className="m-0 text-gray-500 text-sm whitespace-normal leading-tight">{item.description}</p>
              <p className="m-0 text-sm leading-loose">€{item.price.toFixed(2)}</p>
            </div>
            <span
              className={`transition-all duration-200 flex-shrink-0`}
            >
              <Plus className={item.unavailable ? 'opacity-20' : ''} />
            </span>
          </Button>
          {/* Minus button */}
          <Button
            variant="destructive"
            className={`transition-all duration-200 h-full rounded-l-none rounded-r-md flex items-center justify-center p-0 ${
              item.amount > 0 ? 'w-10' : 'w-0'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              decrement(item);
            }}
          >
            <span className="flex justify-center items-center">
              <Minus />
            </span>
          </Button>
        </div>
      </div>
  );
}