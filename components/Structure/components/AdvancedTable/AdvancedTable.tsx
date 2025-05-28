import TanstackTableImplementation from "./TanstackTableImplementation";
import { Children, PropsWithChildren, ReactElement } from 'react';
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import HeaderCell from "./HeaderCell";
import { Checkbox } from "@/components/ui/checkbox";
import { DateToFileString } from "@/lib/utils";
import { DateFilterFunction, DateRangeType } from "./FilterDate";
import { isDate } from "./FilterDate";
import { Check, X } from "lucide-react";
import { NumberFilterFunction } from "./FilterNumber";

interface Props {
  data: Array<any>,
  className?: string,
  enableGeneralSearch?: boolean
  enableRowSelection?: boolean
}

function isComponent(object: any, componentName: string) {
  return typeof object === 'object' && Object.hasOwn(object, 'type') && object.type.name === componentName
}

const forceReactElement = (object: any): ReactElement => object

export function ObjectToString(object: any): string {
    if (typeof object === 'object') {
      return typeof object.getMonth === 'function' ? DateToFileString(object) : Object.values(object).join('-')
    }
    return String(object)
}

export const ArrayFilterFunction = (row: any, columnId: string, filterValue: Array<string>) => {
    const rowValue = row.getValue(columnId)
    const valueToCheck = ObjectToString(rowValue).toLowerCase()
    
    const filterValues: Array<string> = filterValue
    return filterValues.filter(v => valueToCheck.includes(v.toLowerCase())).length > 0
}

const selectColumn: ColumnDef<any, unknown> = {
  id: "select",
  header: ({ table }: { table: Table<any> }) => (
    <Checkbox
      className='ml-2'
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

  // if (props.data.length == 0) return <TanstackTableImplementation columns={[]} data={props.data}/>

  const advancedTableHeader = forceReactElement(Children.toArray(props.children).filter(child => isComponent(child, 'AdvancedTableHeader')).at(0))
  if (advancedTableHeader == undefined || !Array.isArray(advancedTableHeader.props.children)) return <div>No header row</div>

  //C'est une propriété obligatoire donc il y a forcément un accessor par header
  const headers = Object.assign({}, ...advancedTableHeader.props.children.map((header: ReactElement) => {return {[header.props.accessor]:header}}))
  const accessors = Object.keys(headers)

  if (accessors.some(accessor => accessor === '')) return <div>One or more accessors are empty</div>

  const AdvancedTableBodyRow = forceReactElement(Children.toArray(props.children).filter(child => isComponent(child, 'AdvancedTableBodyRow')).at(0))
  const rowCells = AdvancedTableBodyRow && AdvancedTableBodyRow.props.children
                    ? Object.assign({}, ...(AdvancedTableBodyRow.props.children.map((rowCell: ReactElement) => {return {[rowCell.props.accessor]:rowCell}})))
                    : {}

  const columns = accessors.filter(accessor => headers[accessor].props.hidden !== true).map((accessor): ColumnDef<any, unknown> =>
  {
    let isDateColumn : boolean | undefined = undefined // If the column has only undefined values this will stay undefined
    let isNumberColumn : boolean | undefined = undefined
    let isBooleanColumn : boolean | undefined = undefined

    props.data.forEach((row) => {
      // We assume that it's a date column if the first value not undefined is a real date
      // Because for the moment there isn't any use case where a column would have multiple data types including a Date value
      if (isDateColumn == undefined && row[accessor] != undefined) {
        isDateColumn = isDate(row[accessor])
      }
      // As for the number and boolean it is possible that it's a string column with somes values being a number or true or false
      // So we need to go through the whole column to make sure
      // If it becomes to costly we can only check the first not undefined value and infer the table type from there
      if (isNumberColumn == undefined && row[accessor] != undefined) {
        isNumberColumn = typeof row[accessor] == 'number'
      }
      else if (isNumberColumn && row[accessor] != undefined && typeof row[accessor] != 'number') {
        isNumberColumn = false
      }
      if (isBooleanColumn == undefined && row[accessor] != undefined) {
        isBooleanColumn = typeof row[accessor] == 'boolean'
      }
      else if (isBooleanColumn && row[accessor] != undefined && typeof row[accessor] != 'boolean') {
        isBooleanColumn = false
      }
    })


    const columnDef: ColumnDef<any, unknown> = {
      accessorKey: accessor,
      filterFn: isDateColumn ? DateFilterFunction : (isNumberColumn ? NumberFilterFunction : ArrayFilterFunction),
      header: ({ table, column }) => (
      <HeaderCell table={table} column={column} label={headers[accessor].props.children} icon={headers[accessor].props.icon}
        enableSorting={headers[accessor].props.enableSorting} enableFiltering={headers[accessor].props.enableFiltering} enableGrouping={headers[accessor].props.enableGrouping}
        isDateColumn={isDateColumn} isNumberColumn={isNumberColumn}
        displayValueFunction={headers[accessor].props.displayValueFunction}
      />
      ),
    }

    if (rowCells[accessor] != undefined) {
      columnDef.cell = ({ row }) => {
        let cellValue = ( rowCells[accessor].props.valueEditFunction != undefined
                          ? rowCells[accessor].props.valueEditFunction(row.getValue(accessor))
                          : row.getValue(accessor) )
        const cellChildren = (rowCells[accessor].props.children?.length > 0) ? rowCells[accessor].props.children : cellValue
        if (!Array.isArray(cellChildren)) return cellChildren //If there is only one child the children array is not constructed (react behavior) so we return it directly
        return rowCells[accessor].props.children?.map((child: any) => isComponent(child, 'CellRawValue') ? cellValue : child)
      }

      if (rowCells[accessor].props.sortingFunction != undefined)
      {
        columnDef.sortingFn = (
          (rowA: Row<any>, rowB: Row<any>, columnId: string) =>
            rowCells[accessor].props.sortingFunction(rowA.original[columnId], rowB.original[columnId])
        )
      }
    }
    else {
      if (isNumberColumn) {
        columnDef.cell = ({ row }) => <span className="text-right w-full pr-2">{row.getValue(accessor)}</span>
      }
      else if (isBooleanColumn) {
        columnDef.cell = ({row}) => <div className="justify-center flex w-full">{row.getValue(accessor) ? <Check className="w-5 h-5"/> : <X className="w-5 h-5"/>}</div>
      }
    }

    columnDef.getGroupingValue = row => ObjectToString(row[accessor])

    return columnDef
  })

  if (props.enableRowSelection === true) {
    columns.push(selectColumn)
  }

  return <TanstackTableImplementation columns={columns} data={props.data} />
}

export default AdvancedTable;