import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors",
  {
    variants: {
      variant: {
        active: "text-primary-foreground hover:bg-primary/90",
        default: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "active",
      size: "default",
    },
  }
);

export interface NavButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export default function NavButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: NavButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "relative overflow-hidden",
        buttonVariants({ variant, size, className })
      )}
      {...props}
    >
      <AnimatePresence initial={false}>
        {variant === "active" && (
          <motion.span
            key="background"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-primary rounded-full"
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </Comp>
  );
}

export { buttonVariants };
