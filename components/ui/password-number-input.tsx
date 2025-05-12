"use client";

import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordNumberInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const [numValue, setNumValue] = useState<number | null>(null);
    const disabled =
      numValue === null || numValue === undefined || props.disabled;

    function onValChange(e: any) {
      const re = /^[0-9\b]+$/;
      if (e.target.value === "" || re.test(e.target.value)) {
        setNumValue(e.target.value);
        value = e.target.value;
        onChange ? onChange(e) : "";
      } else if (numValue == null) {
        e.target.value = null;
        value = undefined;
      }
    }

    return (
      <div className={cn(className, "relative px-0")}>
        <Input
          type={showPassword ? "number" : "password"}
          onChange={onValChange}
          value={numValue!}
          className="hide-password-toggle px-1 pr-5 text-xs w-[106px]"
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
PasswordNumberInput.displayName = "PasswordNumberInput";

export { PasswordNumberInput };
