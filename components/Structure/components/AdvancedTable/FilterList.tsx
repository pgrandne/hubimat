import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface FilterListProps {
    columnFilter: any
    setColumnFilter: Function
    columnValuesCounted: [string, {"count":number, "displayValue":string}][]
    
}

// TODO: Précocher les valeurs qui ressortent quand on fait une recherche pour le filtre
export default function FilterList({ columnFilter, setColumnFilter, columnValuesCounted }: FilterListProps) {
    return (
        <Command>
            <CommandInput placeholder="Chercher" onKeyDown={(e) => e.stopPropagation()} />
            <CommandList>
                <CommandEmpty>Aucun résultat</CommandEmpty>
                <CommandItem key="select_all" className="cursor-pointer" onSelect={() => setColumnFilter(undefined)}>
                    {/* <Checkbox
                        className="mr-2"
                        checked={columnFilter != undefined && (columnFilter as Array<string>).length == columnValuesCounted.length}
                        onCheckedChange={
                            (checked) => {
                                if (checked) {
                                    setColumnFilter(columnValuesCounted.map(c => c[0]))
                                }
                                else {
                                    setColumnFilter(undefined) //if we don't want to reset when unchecking 'select all' we need to set value to []
                                }
                            }
                        }
                    /> */}
                    Sélectionner tout
                </CommandItem>
                {
                    columnValuesCounted.map(
                        (c) => {
                            const content = c[0]
                            return <CommandItem key={content}>
                                <Checkbox
                                    className="mr-2"
                                    checked={Array.isArray(columnFilter) && (columnFilter as Array<string>).includes(content)}
                                    onCheckedChange={
                                        (checked) => {
                                            if (checked) {
                                                if (!Array.isArray(columnFilter)) {
                                                    setColumnFilter([content])
                                                }
                                                else {
                                                    setColumnFilter((columnFilter as Array<string>).concat(content))
                                                }
                                            }
                                            else {
                                                setColumnFilter((columnFilter as Array<string>).filter(v => v != content))
                                            }
                                        }
                                    }
                                />
                                {c[1].displayValue + " x" + String(c[1].count)}
                            </CommandItem>
                        }
                    )
                }
            </CommandList>
        </Command>
    );
}