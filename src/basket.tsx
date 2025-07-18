import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Checkout from './checkout';

export default function Basket(props) {
  const [show, setShow] = useState(false);

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
        <Button variant="primary" className="flex items-center gap-2">
          Je bestelling
          <span className="bg-secondary text-white rounded-full px-2 py-1 text-xs font-bold mx-2">
            {total}
          </span>
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
                    <span className="bg-primary text-white rounded-full px-3 py-1 text-xs font-bold mx-3">
                      {item.amount}
                    </span>
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <h6 className="text-sm text-gray-500">€{(item.price * item.amount).toFixed(2)}</h6>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => props.decrement(item)}
                      className="bg-zinc-100 text-zinc-800 rounded-full px-2 py-1 hover:bg-zinc-200 transition"
                    >
                      <FaMinus />
                    </button>
                    <button
                      type="button"
                      onClick={() => props.increment(item)}
                      className="bg-zinc-800 text-white rounded-full px-2 py-1 hover:bg-zinc-700 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <hr className="my-2 border-zinc-200" />
              </React.Fragment>
            ) : null
          )}
        </div>
        <DialogFooter>
          <h4 className="font-bold text-lg mr-auto">€{totalPrice}</h4>
          <Button variant="primary" type="button" onClick={() => setShow(false)}>
            Bestel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}