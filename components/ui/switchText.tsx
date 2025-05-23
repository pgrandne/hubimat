"use client"

import { Dispatch, SetStateAction, useId, useState } from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "../../lib/utils";
export const SwitchText = ({
    actualState,
    setState,
    activeText,
    inactiveText, 
    className
}: {
        actualState: boolean;
        setState: Dispatch<SetStateAction<boolean>>;
        activeText: string;
        inactiveText: string;
        className?: string;
    }) => {
    const id = useId()
    function setSelectedValue(value: string): void {
        if (value === "on")
            setState(true);
        else
            setState(false);
    }
    //const [selectedValue, setSelectedValue] = useState("on")

    return (
        <div className={className}>
        <div className="bg-input/50 inline-flex h-9 rounded-md p-0.5">
            <RadioGroup
                value={actualState ? "on":"off"}
                onValueChange={setSelectedValue}
                className="grid-cols-[1fr_1fr] group relative inline-grid items-center gap-0 text-sm font-medium after:bg-background after:absolute after:inset-y-0 after:w-1/2 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 has-focus-visible:after:ring-[3px] data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
                data-state={actualState ? "on" : "off"}
            >
                    <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=on]:text-muted-foreground/70 group-data-[state=off]:text-emerald-500">
                    {inactiveText}
                    <RadioGroupItem id={`${id}-1`} value="off" className="sr-only" />
                </label>
                    <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=off]:text-muted-foreground/70 group-data-[state=on]:text-emerald-500">
                    <span>
                        {activeText}
                    </span>
                    <RadioGroupItem id={`${id}-2`} value="on" className="sr-only" />
                </label>
            </RadioGroup>
            </div>
        </div>
    );
}

