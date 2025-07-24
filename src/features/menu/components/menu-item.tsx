import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/types";
import { Badge } from "@/components/ui/badge";

export interface ItemProps {
  item: MenuItem;
  incrementItem?: () => void;
  decrementItem?: () => void;
  resetItem?: () => void;
}

export default function Item(props: ItemProps) {
  const { item, incrementItem, decrementItem } = props;
  return (
    <div
      className={`flex items-center rounded-md ${
        item.unavailable ? "saturate-0 brightness-90 pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-1 h-full min-w-0">
        <Button
          variant={item.amount > 0 ? "secondary" : "ghost"}
          className={`flex items-center flex-1 p-0 pr-6 text-left justify-start h-full rounded-md min-w-0 ${
            item.amount > 0 ? "rounded-r-none" : ""
          } ${!item.unavailable ? "hover:bg-gray-50 active:bg-gray-100" : ""}`}
          onClick={() => incrementItem && incrementItem()}
          disabled={item.unavailable}
        >
          <div className="flex m-3 h-[3rem] w-[3rem] relative align-middle flex-shrink-0">
            <img
              className="max-w-full max-h-full m-auto rounded object-contain"
              src={item.picture}
              alt={item.name}
            />
            <Badge
              variant="round"
              className={`transition-all duration-50 absolute -top-2 -right-2 h-6 w-6 px-2 py-1 font-size-sm ${
                item.amount === 0 && "h-0 w-0 opacity-0"
              }`}
            >
              {item.amount}
            </Badge>
          </div>
          <div className="flex flex-col m-2 flex-1 min-w-0">
            <p className="m-0 font-bold whitespace-normal leading-tight">
              {item.name}
            </p>
            <p className="m-0 text-gray-500 text-sm whitespace-normal leading-tight">
              {item.description}
            </p>
            <p className="m-0 text-sm leading-loose">
              €{item.price?.toFixed(2)}
            </p>
          </div>
          <span className={`flex-shrink-0`}>
            {item.unavailable ? (
              <Badge variant="secondary">Niet beschikbaar</Badge>
            ) : (
              <Plus className={"opacity-30"} />
            )}
          </span>
        </Button>
        {/* Minus button */}
        <Button
          variant="destructive"
          className={`transition-all duration-200 h-full rounded-l-none rounded-r-md flex items-center justify-center p-0 ${
            item.amount > 0 ? "w-12" : "w-0"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            decrementItem && decrementItem();
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
