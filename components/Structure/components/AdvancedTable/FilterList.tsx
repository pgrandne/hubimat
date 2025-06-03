import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { commandScore } from "./command-score";

interface FilterListProps {
    columnFilter: any
    setColumnFilter: Function
    columnValuesCounted: [string, {"count":number, "displayValue":string}][]
    forceUpdate: Function
}

export default function FilterList({ columnFilter, setColumnFilter, columnValuesCounted, forceUpdate }: FilterListProps) {

    const updateFilter = (value : string) => {
        if (!Array.isArray(columnFilter)) setColumnFilter([value])
        else {
            if ((columnFilter as Array<string>).includes(value)) {
                const newFilter = (columnFilter as Array<string>).filter(v => v != value)
                if (newFilter.length == 0) setColumnFilter(undefined)
                else setColumnFilter(newFilter)
            }
            else setColumnFilter((columnFilter as Array<string>).concat(value))
        }
    }

    return (
        <Command loop>
            <CommandInput placeholder="Chercher" onKeyDown={e => {
                e.stopPropagation()
                const inputValue = (e.target as EventTarget & HTMLInputElement).value
                const searchResults = columnValuesCounted.filter(v => commandScore(v[1].displayValue, inputValue??"", [v[1].displayValue.toLowerCase()]) > 0).map(v => v[0])
                // Uncomment next line if we want to see the search results checked. But it will get checked one event later due to useState updating columnFilter on the next render
                // setColumnFilter(searchResults.length > 0 && searchResults.length != columnValuesCounted.length ? searchResults : undefined)
                if (e.key == "Enter") forceUpdate(searchResults.length > 0 && searchResults.length != columnValuesCounted.length ? searchResults : undefined)
            }}/>
            <CommandList>
                <CommandEmpty>Aucun résultat</CommandEmpty>
                <CommandItem key="select_all" className="cursor-pointer" onSelect={() => setColumnFilter(undefined)}>
                    Sélectionner tout
                </CommandItem>
                {
                    columnValuesCounted.map(
                        (c) => {
                            const content = c[0]
                            return <CommandItem key={content} value={c[1].displayValue} onSelect={() => updateFilter(content)}>
                                <Checkbox
                                    className="mr-2"
                                    checked={Array.isArray(columnFilter) && (columnFilter as Array<string>).includes(content)}
                                    onCheckedChange={() => updateFilter(content)}
                                />
                                <span className="mr-auto">{c[1].displayValue}</span>
                                <span className="ml-2">{c[1].count}</span>
                            </CommandItem>
                        }
                    )
                }
            </CommandList>
        </Command>
    );
}