import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Column } from "@tanstack/react-table";

interface FilterListProps {
    column: Column<any, unknown>;
    columnValuesCounted: [string, {"count":number, "displayValue":string}][];
}


export default function FilterList({ column, columnValuesCounted }: FilterListProps) {
    return (
        <Command>
            <CommandInput placeholder="Chercher" />
            <CommandList>
                <CommandEmpty>Aucun résultat</CommandEmpty>
                <CommandItem key="select_all">
                    <Checkbox
                        checked={column.getFilterValue() != undefined && (column.getFilterValue() as Array<string>).length == columnValuesCounted.length}
                        onCheckedChange={
                            (checked) => {
                                if (checked) {
                                    column.setFilterValue(columnValuesCounted.map(c => c[0]))
                                }
                                else {
                                    column.setFilterValue(undefined) //if we don't want to reset when unchecking 'select all' we need to set value to []
                                }
                            }
                        }
                    />
                    Sélectionner tout
                </CommandItem>
                {
                    columnValuesCounted.map(
                        (c) => {
                            const content = c[0]
                            return <CommandItem key={content}>
                                <Checkbox checked={column.getFilterValue() != undefined && (column.getFilterValue() as Array<string>).filter(v => v == content).length > 0}
                                    onCheckedChange={
                                        (checked) => {
                                            //Pars du principe qu'il n'y aura aucune erreur ou changement d'état de départ ou en cours
                                            if (checked) {
                                                if (!column.getFilterValue()) {
                                                    column.setFilterValue([content])
                                                }
                                                else {
                                                    column.setFilterValue((column.getFilterValue() as Array<string>).concat(content))
                                                }
                                            }
                                            else {
                                                column.setFilterValue((column.getFilterValue() as Array<string>).filter(v => v != content))
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