"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Copy, Pencil, ArrowUpDown, ChevronDown, Group } from "lucide-react"
import { toast } from "sonner"
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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Hardware = {
  id: string
  category: string
  object_type: ObjectType
  label: string
  description: string
  parameters: ObjectParameter
  tests: boolean
  instance: number
}

export type ObjectType = {
  name: string,
  icon_source: string
}

export type ObjectParameter = {
  type: string,
  protocol: string,
  utl: number
}


export const columns: ColumnDef<Hardware>[] = [
  {
    id: "select",
    header: ({ table }) => (
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
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        title="Sélectionner"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    filterFn: (row, columnId, filterValue) => {
      const row_value = row.getValue(columnId)
      const filterValues: Array<string> = filterValue
      return typeof row_value === 'string' && filterValues.filter(v => String(row_value).toLowerCase().includes(v.toLowerCase())).length > 0
    },
    header: ({ table, column }) => {
      return (
        <div>
          Catégorie (Device type Group)
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-2 h-7 w-7 p-0" title="Ouvrir le menu">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Trier</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <ArrowUpDown />
                Par ordre alphabétique
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filtrer</DropdownMenuLabel>
              <Command>
                <CommandInput placeholder="Chercher"/>
                <CommandList>
                  <CommandEmpty>Aucun résultat</CommandEmpty>
                  <CommandItem key="select_all">
                    <Checkbox 
                      checked={column.getFilterValue() != undefined && (column.getFilterValue() as Array<string>).length == 2}
                      onCheckedChange={
                        (checked) => {
                          if (checked) {
                            column.setFilterValue(Array.from(column.getFacetedUniqueValues().keys()))
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
                    Array.from(column.getFacetedUniqueValues().keys()).map(
                      content => 
                        <CommandItem key={content}>
                          <Checkbox checked={column.getFilterValue() != undefined &&  (column.getFilterValue() as Array<string>).filter(v => v == content).length > 0}
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
                        {content}
                        </CommandItem>
                    )
                  }
                </CommandList>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" className="h-7 w-7 p-0" title="Grouper"
            onClick={ () => column.toggleGrouping() }
          >
            <Group />
          </Button>
        </div>
      )
    },
    // cell: ({ row }) => {
    //   const cell = row.getAllCells().filter(c => c.column.id === 'category')[0]
    
    //   return flexRender(cell.column.columnDef.cell, cell.getContext())
    // }
  },
  {
    accessorKey: "object_type",
    header: "Icône et Type d'objet",
    aggregationFn: (columnId, leafRows, childRows) => {
      return ""
    },
    cell: ({ row }) => {
      const object_type: ObjectType = row.getValue("object_type")
 
      return <span><img src={object_type.icon_source} style={{maxWidth:'50px', display: 'inline', marginRight:'1em'}}></img>{object_type.name}</span>
    }
  },
  {
    accessorKey: "label",
    header: "Label de l'objet",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "parameters",
    header: "Paramètre(s) Interface",
    aggregationFn: (columnId, leafRows, childRows) => {
      return ""
    },
    cell: ({ row }) => {
      const parameters: ObjectParameter = row.getValue("parameters")
 
      return parameters.type + " - " + parameters.protocol + " | "+ parameters.utl
    }
  },
  {
    accessorKey: "tests",
    header: "Tests",
    cell: ({ row }) => {
      const testsOK: boolean = row.getValue("tests")
 
      return testsOK ? "☑" : "☒"
    }
  },
  {
    accessorKey: "instance",
    header: ({ column }) => {
      return (
        <div>
          Instance
          <Button variant="ghost" className="h-7 w-7 p-0" title="Grouper"
            onClick={() => { column.toggleGrouping() }}
          >
            <Group />
          </Button>
        </div>
      )
    }
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const hardware = row.original
 
      return (
        <span>
          <Button variant="ghost" onClick={() => {navigator.clipboard.writeText(hardware.id); toast.success("Copié dans le presse-papier")}} title="Copier l'identifiant">
            {/* <span className="sr-only">Copy ID</span> */}
            <Copy style={{display: 'inline'}} />
          </Button>
          <Button variant="ghost" onClick={() => 1} title="Modifier">
            {/* <span className="sr-only">Edit hardware</span> */}
            <Pencil style={{display: 'inline'}} />
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
]
