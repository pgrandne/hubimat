import { Check, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function LinkableWrapper({className, children, onChange, defaultValue} : {className?: string, children: ReactNode, onChange?: (newStepId:string) => void, defaultValue?: string}) {
    const { getNodes } = useReactFlow();
    const [linkedStep, setLinkedStep] = useState<{name:string, id:string} | undefined>({name: String(getNodes().filter(n => n.id === defaultValue).at(0)?.data.title ?? ""), id: defaultValue ??""})
    const [open, setOpen] = useState(false)
    const [comboboxValues, setComboboxValues] = useState<{value: string, label: string}[]>([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {if (open) setComboboxValues(getNodes().filter(node => node.data.title && node.data.title !== "").map(node => ({value : node.id, label : String(node.data.title)})))}, [open])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => onChange?.(linkedStep?.id??""), [linkedStep])

    return (
        <div className={cn("flex items-center h-fit w-full", className)}>
            {children}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="">
                    <Button variant="secondary"
                        className="flex items-center h-fit w-fit max-w-[7rem] min-h-5 ml-auto text-sm py-0 overflow-hidden gap-0"
                        role="combobox"
                        aria-expanded={open}
                        style={{paddingLeft:linkedStep?.name?"3px":"6px", paddingRight:linkedStep?.name?"3px":"6px"}}
                    >
                        <Link className="h-3 w-3" />
                        <span className={cn("truncate", linkedStep?.name?"ml-1":"")}>{ linkedStep?.name }</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 h-fit max-h-[400px] overflow-y-auto" useCloseButton={false}>
                    <Command>
                        <CommandInput placeholder="Rechercher une étape..." />
                        <CommandEmpty>Aucune étape trouvée.</CommandEmpty>
                        <CommandList>
                            {comboboxValues.map(comboboxValue => (
                                <CommandItem
                                    key={comboboxValue.value}
                                    value={comboboxValue.label}
                                    onSelect={(currentValue : string) => {
                                        setLinkedStep(linkedStep?.name === currentValue ? undefined : {id:comboboxValue.value, name:comboboxValue.label})
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            linkedStep?.name === comboboxValue.label ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {comboboxValue.label}
                                </CommandItem>
                                )
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default LinkableWrapper