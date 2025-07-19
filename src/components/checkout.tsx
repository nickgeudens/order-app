import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function Checkout(props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary/90 transition">
          Bestel
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Je bestelling</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          {/* Order details go here */}
        </div>
        <DialogFooter>
          <button className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary/90 transition" type="button">
            Bestel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}