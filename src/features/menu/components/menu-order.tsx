import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMenuContext } from "@/features/menu/service/menuService";

export default function MenuOrder() {
  const [show, setShow] = useState<boolean>(false);
  const { menuItems, total, totalPrice, incrementItem, decrementItem } =
    useMenuContext();

  return (
    <Dialog open={show} onOpenChange={setShow}>
      {total > 0 && (
        <nav className="fixed bottom-0 left-0 w-full bg-background border-t-1 shadow-xl h-24 flex items-center z-50">
          <div className="container mx-auto flex justify-end px-4">
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 h-12">
                Je Bestelling
                <Badge
                  variant="roundsecondary"
                  className="h-6 w-6 m-3 font-size-sm"
                >
                  {total}
                </Badge>
                <span className="sr-only">bestelling</span>
              </Button>
            </DialogTrigger>
          </div>
        </nav>
      )}

      <DialogContent
        className="flex max-w-2xl max-h-[70vh] flex-col"
      >
        <DialogHeader>
          <DialogTitle>Je bestelling</DialogTitle>
        </DialogHeader>
        <div className="py-4 overflow-y-auto flex-1">
          {menuItems.map((item) =>
            item.amount > 0 && (
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
                      <h6 className="text-sm text-gray-500">
                        €{(item.price * item.amount).toFixed(2)}
                      </h6>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={(): void => decrementItem(item)}
                      className="rounded-full mx-2 py-1 h-9 w-9"
                    >
                      <Minus />
                    </Button>
                    <Button
                      type="button"
                      variant={"default"}
                      onClick={(): void => incrementItem(item)}
                      className="rounded-full mx-2 py-1 h-9 w-9"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <hr className="my-2" />
              </React.Fragment>
            )
          )}
        </div>
        <DialogFooter>
          <h4 className="font-bold text-lg mr-auto">
            €{totalPrice.toFixed(2)}
          </h4>
          <Button
            variant="default"
            type="button"
            onClick={(): void => setShow(false)}
          >
            Bestel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
