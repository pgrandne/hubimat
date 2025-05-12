import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    search?: boolean;
  }
>(({ className, type, search, ...props }, ref) => {
  return (
    <>
      {search && (
        <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
      )}
      <input
        type={type}
        className={cn(
          "mx-1 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </>
  );
});
Input.displayName = "Input";

export { Input };
