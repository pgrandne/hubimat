"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ReactNode, useState } from "react"

export interface ComboboxValue {
    value: string,
    label: string
}

export function Combobox({
        comboboxValues,
        searchDescription,
        triggerClassname,
    } : {
        comboboxValues: ComboboxValue[]
        searchDescription?: string
        triggerClassname?: string
    }) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", triggerClassname)}
                >
                    {value
                        ? comboboxValues.find((comboboxValue) => comboboxValue.value === value)?.label
                        : searchDescription ?? "Rechercher..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {comboboxValues.map((comboboxValue) => (
                            <CommandItem
                                key={comboboxValue.value}
                                value={comboboxValue.value}
                                onSelect={(currentValue : any) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === comboboxValue.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {comboboxValue.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
