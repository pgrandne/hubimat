import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-secondary hover:bg-accent hover:text-accent-foreground border rounded-lg",
        secondary: "bg-secondary text-secondary-foreground hover:bg-iconHover",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        menu: "hover:bg-accent hover:text-accent-foreground border rounded-lg flex flex-col",
        menu2:
          "hover:bg-accent hover:text-accent-foreground border rounded-lg flex gap-1",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-md",
        sm: "h-9 rounded-md px-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        zoom: "h-10 w-10 px",
        category: "h-16 w-16",
        action: "h-20 w-20 px",
          action2: "h-20 w-50px",
          min: "py-0 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
