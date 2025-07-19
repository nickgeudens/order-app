import { Plus, Trash, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
      <Card className={
        "border-1 relative"}>
          <div
            className={`flex flex-col justify-between w-full` + 
              ( item.unavailable
                ? 'saturate-0 brightness-90 pointer-events-none'
                : 'transition duration-150 select-none hover:brightness-95 active:brightness-85')
            }
            onClick={item.unavailable ? undefined : () => increment(item)}
          >
            <div className="flex items-center">
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
              <div className="flex flex-col m-2 mr-auto">
                <p className="m-0 font-bold">{item.name}</p>
                <p className="m-0 text-gray-500 text-sm">{item.description}</p>
                <p className="m-0 text-sm">€{item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
          {/* Plus and minus buttons */}
          <div className="flex flex-col justify-center items-center absolute top-0 right-0 h-full">
            {item.amount > 0 && (
              <Button
              variant={"destructive"}
                className="text-white rounded-r-lg hover:bg-red-600 transition-all flex items-center justify-center h-full px-3"
                style={{ borderRadius: '0px 0.5rem 0.5rem 0px' }}
                onClick={() => decrement(item)}
              >
                <Minus />
              </Button>
            )}
            <Button
              variant="ghost"
              className={`flex items-center justify-center px-3 ${item.amount > 0 ? 'absolute top-0 right-12 h-full' : 'absolute top-0 right-0 h-full'} text-dark rounded-l-lg transition-all`}
              style={{ borderRadius: item.amount > 0 ? '0.5rem 0 0 0.5rem' : '0px 0.5rem 0.5rem 0px' }}
              onClick={() => increment(item)}
              disabled={item.unavailable}
            >
              <Plus className={item.unavailable ? 'opacity-20' : ''} />
            </Button>
          </div>
      </Card>
      {/*
      <Modal ... />
      */}
    </div>
  );
}