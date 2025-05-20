"use client"

import { Row, Table } from "@tanstack/react-table"
import { MoreHorizontal, Copy, Pencil, ArrowUpDown, ChevronDown, Group } from "lucide-react"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateToFileString } from "@/lib/utils"


export function ObjectToString(object: any): string {
    let valueToCheck = String(object)

    if (typeof object === 'object') {
        valueToCheck = typeof object.getMonth === 'function' ? DateToFileString(object) : Object.values(object).join('-')
    }

    return valueToCheck
}


export const ArrayFilterFunction = (row: any, columnId: string, filterValue: Array<string>) => {
    const rowValue = row.getValue(columnId)
    const valueToCheck = ObjectToString(rowValue).toLowerCase()
    
    const filterValues: Array<string> = filterValue
    return filterValues.filter(v => valueToCheck.includes(v.toLowerCase())).length > 0
}

export function DateInRangeFilter(row: any, columnId: string, filterValue: Array<Date>): boolean {
    const date: Date = row.getValue(columnId)
    return filterValue[0] <= date && date <= filterValue[1]
}

export const selectColumn = {
    id: "select",
    header: ({ table }: { table: Table<any> }) => (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            title="Sélectionner tout"
        />
    ),
    cell: ({ row }: { row: Row<any> }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            title="Sélectionner"
        />
    ),
    enableSorting: false,
    enableHiding: false,
}

export const actionColumn = {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }: { row: Row<any> }) => {
        const object = row.original

        return (
            <span>
                <Button variant="ghost" onClick={() => { navigator.clipboard.writeText(object.id); toast.success("Copié dans le presse-papier") }} title="Copier l'identifiant">
                    {/* <span className="sr-only">Copy ID</span> */}
                    <Copy style={{ display: 'inline' }} />
                </Button>
                <Button variant="ghost" onClick={() => 1} title="Modifier">
                    {/* <span className="sr-only">Edit hardware</span> */}
                    <Pencil style={{ display: 'inline' }} />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" title="Ouvrir le menu">
                            {/* <span className="sr-only">Open menu</span> */}
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem onClick={() => 2}>Supprimer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => 3}>Voir en détail</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => 4}>Voir sur le plan</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>

        )
    },
}
