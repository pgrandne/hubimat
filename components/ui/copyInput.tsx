"use client";

import { cn } from "@/lib/utils";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useId, useRef, useState } from "react";
import React from "react";

export const CopyInput = React.forwardRef<
    HTMLInputElement,
    InputProps
>(({ className, id, defaultValue, ...props }, ref) => {
    const [copied, setCopied] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className={className}>
            <div className="relative w-full">
                <Input
                    ref={inputRef}
                    id={id}
                    type="text"
                    defaultValue={defaultValue}
                    readOnly
                    className="m-0 w-full text-xs"
                />
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleCopy}
                                className="text-muted-foreground/80 transition-[color,box-shadow] absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                aria-label={copied ? "Copied" : "Copy to clipboard"}
                                disabled={copied}
                            >
                                <div
                                    className={cn(
                                        "transition-all",
                                        copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                                    )}
                                >
                                    <CheckIcon className="stroke-emerald-500" size={16} aria-hidden="true" />
                                </div>
                                <div
                                    className={cn(
                                        "absolute transition-all",
                                        copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                                    )}
                                >
                                    <CopyIcon size={16} aria-hidden="true" />
                                </div>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent className="px-2 py-1 text-xs">Copier dans le presse papier</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
});

CopyInput.displayName = "CopyInput";

