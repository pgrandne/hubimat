"use client";

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
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  globalFilterValue?: string;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
}

export interface AdvancedTablePropsMethods {
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  setPageIndex: (pageIndex: number) => void;
  getPageCount: () => number;
  getPageIndex: () => number;
  getFilteredDataSize: () => number;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  getFinalData: () => Array<any>;
}

const TanstackTableImplementation = forwardRef(
  <TData, TValue>(
    {
      columns,
      data,
      className,
      globalFilterValue,
      pagination,
      setPagination,
    }: AdvancedTableProps<TData, TValue>,
    ref: Ref<unknown> | undefined
  ) => {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>();
    useEffect(() => setGlobalFilter(globalFilterValue), [globalFilterValue]);

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
      globalFilterFn: "includesString",
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      state: {
        rowSelection,
        sorting,
        columnFilters,
        globalFilter,
        pagination,
      },
      initialState: {
        columnPinning: {
          left: ["select"],
          right: ["actions"],
        },
      },
    });

    useImperativeHandle(ref, () => ({
      nextPage: () => {
        if (table.getCanNextPage()) table.nextPage();
      },
      previousPage: table.previousPage,
      setPageSize: (pageSize: number) => {
        table.setPageSize(pageSize);
        table.resetPageIndex();
      },
      setPageIndex: (pageIndex: number) =>
        table.setPageIndex(
          Math.max(0, Math.min(table.getPageCount() - 1, pageIndex))
        ),
      getPageCount: table.getPageCount,
      getPageIndex: () => pagination.pageIndex,
      getFilteredDataSize: () => table.getRowCount(),
      goToFirstPage: table.firstPage,
      goToLastPage: table.lastPage,
      getFinalData: () =>
        table.getPrePaginationRowModel().rows.map((row) => row.original),
    }));

    const headerCellsRef = useRef<string[]>([]);

    return (
        <Table className={cn("rounded-xl border max-h-full block overflow-y-auto min-w-0 w-fit max-w-full", className)} style={{ display: "block" }}>
          <TableHeader className="sticky top-0 bg-[hsl(var(--background))]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead ref={el => {if (el !== null) headerCellsRef.current[index] = String(el.getBoundingClientRect().width.toFixed(5))}} key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn("pl-2 text-left text-sm", "min-w-[" + headerCellsRef.current[index] + "px]")}
                    >
                      <div className={cn("flex items-center", "min-w-[" + headerCellsRef.current[index] + "px]")}>
                        {row.getCanExpand() && cell.getIsGrouped() && (
                          <button
                            onClick={row.getToggleExpandedHandler()}
                            style={{ cursor: "pointer" }}
                          >
                            {row.getIsExpanded() ? (
                              <ChevronDown />
                            ) : (
                              <ChevronRight />
                            )}
                          </button>
                        )}
                        {((!row.getCanExpand() &&
                          !cell.column.getIsGrouped()) ||
                          (row.getCanExpand() && cell.getIsGrouped()) ||
                          cell.column.id === "select") &&
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    );
  }
);

TanstackTableImplementation.displayName = "TanstackTableImplementation";

export default TanstackTableImplementation;
