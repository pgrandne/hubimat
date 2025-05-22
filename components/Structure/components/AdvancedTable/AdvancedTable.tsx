import TanstackTableImplementation from "./TanstackTableImplementation";
import { Children, PropsWithChildren, ReactElement } from 'react';
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import HeaderCell from "../DEPRECATED AdvancedTable/HeaderCell";
import { Checkbox } from "@/components/ui/checkbox";
import { Hardware } from "../../Core";
import { DateToFileString } from "@/lib/utils";

interface Props {
  data: Array<any>,
  className?: string,
  enableGeneralSearch?: boolean
  enableRowSelection?: boolean
}

function isComponent(object: any, componentName: string) {
  return typeof object === 'object' && Object.hasOwn(object, 'type') && object.type.name === componentName
}

function forceReactElement(object: any): ReactElement {
  return object
}

export function ObjectToString(object: any): string {
    let valueToCheck = String(object)
    if (typeof object === 'object') {
        valueToCheck = typeof object.getMonth === 'function' ? DateToFileString(object) : Object.values(object).join('-')
    }
    return valueToCheck
}

const ArrayFilterFunction = (row: any, columnId: string, filterValue: Array<string>) => {
    const rowValue = row.getValue(columnId)
    const valueToCheck = ObjectToString(rowValue).toLowerCase()
    
    const filterValues: Array<string> = filterValue
    return filterValues.filter(v => valueToCheck.includes(v.toLowerCase())).length > 0
}

const selectColumn: ColumnDef<any, unknown> = {
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

const AdvancedTable = (props: PropsWithChildren<Props>) => {

  if (props.data.length == 0) return <>Empty table</>

  const advancedTableHeader = forceReactElement(Children.toArray(props.children).filter(child => isComponent(child, 'AdvancedTableHeader')).at(0))
  if (advancedTableHeader == undefined) return <>No header row</>

  const headers = advancedTableHeader.props.children
  const accessors = Object.keys(props.data.at(0))
  // On peut ne pas faire ce check et afficher quand même le tableau tel que défini en attendant que la data se load -> Tout transformer en async
  if (headers.length != accessors.length) return <>Missing headers</>

  const rowCells = forceReactElement(Children.toArray(props.children).filter(child => isComponent(child, 'AdvancedTableBodyRow')).at(0))?.props.children
  if (rowCells.length != accessors.length) return <>Missing body row cells</>

  const columns = accessors.map((accessor, i): ColumnDef<any, unknown> => {
    let columnDef: ColumnDef<any, unknown> = {
      accessorKey: accessor,
      filterFn: ArrayFilterFunction,
      header: ({ table, column }) => (
      <HeaderCell table={table} column={column} name={headers[i].props.children}
        enableSorting={headers[i].props.enableSorting} enableFiltering={headers[i].props.enableFiltering} enableGrouping={headers[i].props.enableGrouping}
        displayValueFunction={headers[i].props.displayValueFunction}
      />
      )
    }

    if (Object.keys(rowCells[i].props).length != 0) {
      columnDef.cell = ({ row }) => {
        let cellValue = (rowCells[i].props.valueEditFunction != undefined) ? rowCells[i].props.valueEditFunction(row.getValue(accessor)) : row.getValue(accessor)
        const cellChildren = (rowCells[i].props.children?.length > 0) ? rowCells[i].props.children : cellValue
        if (!Array.isArray(cellChildren)) return cellChildren
        return rowCells[i].props.children?.map((child: any) => isComponent(child, 'CellRawValue') ? cellValue : child)
      }
    }

    columnDef.getGroupingValue = (row) => ObjectToString(row[accessor])

    if (rowCells[i].props.sortingFunction != undefined)
      { columnDef.sortingFn = (rowA: Row<any>, rowB: Row<any>, columnId: string) => rowCells[i].props.sortingFunction(rowA.original[columnId], rowB.original[columnId]) }

    return columnDef
  }).filter((_columnDef, i) => headers[i].props.hidden !== true)

  if (props.enableRowSelection === true) {
    columns.push(selectColumn)
  }

  return <TanstackTableImplementation columns={columns} data={props.data}></TanstackTableImplementation>
}

export default AdvancedTable;