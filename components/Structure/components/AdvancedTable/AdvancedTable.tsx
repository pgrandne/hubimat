import TanstackTableImplementation from "./TanstackTableImplementation";
import { Children, PropsWithChildren } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import HeaderCell from "../DEPRECATED AdvancedTable/HeaderCell";

 
interface Props {
  data: Array<any>,
  className?: string,
  enableGeneralSearch?: boolean
}

function isComponent(object: any, componentName: string) {
  return typeof object === 'object' && Object.hasOwn(object, 'type') && object.type.name === componentName
}

const AdvancedTable = (props: PropsWithChildren<Props>) =>  {

  if (props.data.length == 0) return <>Tableau vide</>

  const headers = Children.map(props.children, (child) => child)?.filter(child => isComponent(child, 'AdvancedTableHeader')).at(0)?.props.children
  // console.log(headers)

  const accessors = Object.keys(props.data.at(0))

  if (headers.length != accessors.length) return <>Missing headers</>

  const rowCells = Children.map(props.children, (child) => child)?.filter(child => isComponent(child, 'AdvancedTableBodyRow')).at(0)?.props.children
  console.log(rowCells)

  if (rowCells.length != accessors.length) return <>Missing body row cells</>
  Object.length

  return (
    // <>{props.children}</>
    <TanstackTableImplementation columns={accessors.map((accessor, i): ColumnDef<any, unknown> => {
      let columnDef: ColumnDef<any, unknown> = {
        accessorKey: accessor,
        header: ({ table, column }) => <HeaderCell table={table} column={column} name={headers[i].props.children} />
      }

      if (Object.keys(rowCells[i].props).length != 0) {
        columnDef.cell= ({ row }) => { console.log(rowCells[i].props); return rowCells[i].props.children?.map((child: any) => isComponent(child, 'CellRawValue') ? row.getValue(accessor) : child) }
      }

      return columnDef
    })} data={props.data}></TanstackTableImplementation>
  )
}

export default AdvancedTable;