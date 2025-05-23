import { Column, Table } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Group } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { ObjectToString } from "./ColumnHelper"
import FilterList from "./FilterList"
import FilterDate from "./FilterDate"
import { ReactElement, ReactNode } from "react"
import React from "react"


export default function HeaderCell({ table, column, name = "default", icon, enableSorting = true, enableFiltering = true, enableGrouping = true, displayValueFunction = ObjectToString }: {
    table: Table<any>,
    column: Column<any, unknown>,
    name?: ReactNode,
    icon?: ReactElement
    enableSorting?: boolean,
    enableFiltering?: boolean,
    enableGrouping?: boolean,
    displayValueFunction?: Function
}) {

    // Will these scale well ???
    const columnValuesCounted: [string, {"count":number, "displayValue":string}][] = Object.entries(
        table.getCoreRowModel().rows.map(
            (r: any) => r.getValue(column.id)
        ).reduce(
            (cnt: any, cur: any) => (cnt[ObjectToString(cur)] = {"count": cnt[ObjectToString(cur)]?.count + 1 || 1, "displayValue": displayValueFunction(cur)}, cnt), {}
        )
    )
    const isDate = table.getCoreRowModel().rows.filter((r: any) => typeof r.getValue(column.id).getMonth === 'function').length > 0

    
    
    return (
        <div className="py-2 px-3 mr-2 font-semibold text-sm text-muted-foreground flex items-center">
            <span style={{opacity:'0.7'}}>{icon}</span>
            <span className="flex items-center ml-2" style={{width:'100%', justifyContent:'center'}}>{name}</span>
            {(enableSorting || enableFiltering) &&
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="ml-2 h-7 w-7 p-0" title="Ouvrir le menu">
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {(enableSorting) && <>
                            <DropdownMenuLabel>Trier</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                                <ArrowUpDown />
                                Par ordre alphabétique
                            </DropdownMenuItem>
                        </>}
                        {(enableFiltering) &&
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Filtrer</DropdownMenuLabel>
                                { (isDate) ?
                                    <FilterDate column={column} /> :
                                    <FilterList column={column} columnValuesCounted={columnValuesCounted} />
                                }
                            </>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {(enableGrouping) &&
                <Button variant="ghost" className="h-7 w-7 p-0" title="Grouper"
                    onClick={() => column.toggleGrouping()}
                >
                    <Group />
                </Button>
            }
        </div>
    )
}