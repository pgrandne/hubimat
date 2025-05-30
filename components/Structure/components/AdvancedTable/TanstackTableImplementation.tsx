"use client"

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getGroupedRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface AdvancedTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  className?: string
  globalFilterValue?: string
  showNumber: Function
}

export default function TanstackTableImplementation<TData, TValue>({
  columns,
  data,
  className,
  globalFilterValue
}: AdvancedTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>()
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10});
  useEffect(() => setGlobalFilter(globalFilterValue), [globalFilterValue])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: 'includesString',
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      sorting,
      columnFilters,
      globalFilter,
      pagination
    },
    initialState: {
      columnPinning: {
        left: ['select'],
        right: ['actions'],
      },
    }
  })

  return (
    <div className={"rounded-xl border overflow-y-auto max-h-full "+className||''}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {
                  row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-2 h-12 text-left text-sm">
                      <div className="flex items-center">
                        {
                          row.getCanExpand() && cell.getIsGrouped() &&
                          <button onClick={row.getToggleExpandedHandler()} style={{ cursor: 'pointer' }}>
                            {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
                          </button>
                        }
                        {
                          (!row.getCanExpand() && !cell.column.getIsGrouped() || row.getCanExpand() && cell.getIsGrouped() || cell.column.id === 'select') && 
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </div>
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}