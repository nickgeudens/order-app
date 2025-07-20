import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface BasketItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  category: string;
  amount: number;
  unavailable?: boolean;
}

export interface BasketProps {
  items: BasketItem[];
  increment: (item: BasketItem) => void;
  decrement: (item: BasketItem) => void;
}

export default function OrderDialog(props: BasketProps) {
  const [show, setShow] = useState<boolean>(false);

  const total = props.items
    .map((item) => item.amount)
    .reduce((partialSum, a) => partialSum + a, 0)
    .toFixed(0);
  const totalPrice = props.items
    .map((item) => item.amount * item.price)
    .reduce((partialSum, a) => partialSum + a, 0)
    .toFixed(2);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Je bestelling
          <Badge
            variant="roundsecondary"
            className="h-5 w-5 m-3 font-size-sm"
          >
            {total}
          </Badge>
          <span className="sr-only">bestelling</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Je bestelling</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {props.items.map((item) =>
            item.amount > 0 ? (
              <React.Fragment key={item.id}>
                <div className="flex justify-between items-center pb-2">
                  <div className="flex items-center">
                    <Badge
                      variant="round"
                      className="h-7 w-7 mx-3 my-1 font-bold"
                    >
                      {item.amount}
                    </Badge>
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <h6 className="text-sm text-gray-500">€{(item.price * item.amount).toFixed(2)}</h6>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={(): void => props.decrement(item)}
                      className="rounded-full mx-2 py-1 h-9 w-9"
                    >
                      <Minus />
                    </Button>
                    <Button
                      type="button"
                      variant={"default"}
                      onClick={(): void => props.increment(item)}
                      className="rounded-full mx-2 py-1 h-9 w-9"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <hr className="my-2 border-zinc-200" />
              </React.Fragment>
            ) : null
          )}
        </div>
        <DialogFooter>
          <h4 className="font-bold text-lg mr-auto">€{totalPrice}</h4>
          <Button variant="default" type="button" onClick={(): void => setShow(false)}>
            Bestel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}