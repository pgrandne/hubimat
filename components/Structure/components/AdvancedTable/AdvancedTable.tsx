"use client";

import TanstackTableImplementation, {
  AdvancedTablePropsMethods,
} from "./TanstackTableImplementation";
import {
  Children,
  isValidElement,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import HeaderCell from "./HeaderCell";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CoreDateToString,
  DateToFileString,
  sanitizeFileName,
} from "@/lib/utils";
import { DateFilterFunction } from "./FilterDate";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react";
import { NumberFilterFunction } from "./FilterNumber";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import * as ExcelJS from "exceljs";
import AdvancedTableCaption from "./AdvancedTableCaption";
import AdvancedTableHeader from "./AdvancedTableHeader";
import AdvancedTableBodyRow from "./AdvancedTableBodyRow";
import CellRawValue from "./CellRawValue";

const isComponent = (
  element: React.ReactNode,
  componentType: string | JSXElementConstructor<any>
): element is React.ReactElement =>
  isValidElement(element) && element.type === componentType;

export function ObjectToString(object: any): string {
  if (typeof object === "object") {
    return object instanceof Date
      ? DateToFileString(object)
      : Object.values(object).join("-");
  }
  return String(object);
}

export const ArrayFilterFunction = (
  row: any,
  columnId: string,
  filterValue: Array<string>
) => {
  const rowValue = row.getValue(columnId);
  const valueToCheck = ObjectToString(rowValue).toLowerCase();
  return filterValue.some((v) => valueToCheck == v.toLowerCase());
};

const selectColumn: ColumnDef<any, unknown> = {
  id: "select",
  header: ({ table }: { table: Table<any> }) => (
    <Checkbox
      className="ml-2"
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
};

interface Props {
  data: Array<any>;
  className?: string;
  enableGeneralSearch?: boolean;
  enableRowSelection?: boolean;
  initialPageSize?: number;
  enableExport?: ("csv" | "xlsx")[];
  onAdd?: () => void
  showFooter?: boolean
}

const AdvancedTable = (props: PropsWithChildren<Props>) => {
  const [isExportButtonDisabled, setIsExportButtonDisabled] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string>();
  const tableRef = useRef<AdvancedTablePropsMethods>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: props.initialPageSize ? props.initialPageSize : 10,
  });
  const [pageCount, setPageCount] = useState(1);
  const [caption, setCaption] = useState<string>("tableau_hubiquity");
  const [headers, setHeaders] = useState<{ [key: string]: ReactElement<any> }>(
    {}
  );
  const [displayedAccessors, setDisplayedAccessors] = useState<string[]>([]);
  const [types, setTypes] = useState<{ [key: string]: string | undefined }>({});
  const [columns, setColumns] = useState<ColumnDef<unknown>[]>([]);
  const [onRowClick, setOnRowClick] = useState<(row: any) => void | undefined>(() => {})

  useEffect(() => {
    const _childArray = Children.toArray(props.children);

    const node = _childArray.find((child) =>
      isComponent(child, AdvancedTableCaption)
    );
    const _caption = node
      ? String((node as ReactElement<any>).props.children)
      : "tableau_hubiquity";

    const _advancedTableHeader = _childArray.find((child) =>
      isComponent(child, AdvancedTableHeader)
    ) as ReactElement<any> | undefined;

    const _headers = Object.assign(
      {},
      ...Children.toArray(_advancedTableHeader?.props?.children || []).map(
        (header: any) => ({
          [header.props.accessor]: header,
        })
      )
    );

    const _accessors = Object.keys(_headers);
    const _displayedAccessors = _accessors.filter(
      (accessor) => _headers[accessor]?.props?.hidden !== true
    );
    const _types = Object.fromEntries(_accessors.map((a) => [[a], undefined]));

    const _advancedTableBodyRow = _childArray.find((child) =>
      isComponent(child, AdvancedTableBodyRow)
    ) as ReactElement<any> | undefined;

    const rowCells = _advancedTableBodyRow?.props?.children
      ? Array.isArray(_advancedTableBodyRow.props.children)
        ? Object.assign(
            {},
            ..._advancedTableBodyRow.props.children.map(
              (rowCell: ReactElement<any>) => {
                return { [rowCell.props.accessor]: rowCell };
              }
            )
          )
        : {
            [(_advancedTableBodyRow.props.children as ReactElement<any>).props
              .accessor]: _advancedTableBodyRow.props.children as ReactElement,
          }
      : {};

    const _columns = _displayedAccessors.map(
      (accessor): ColumnDef<unknown, unknown> => {
        // Get the column data type
        const columnTypes = new Set<string>(
          props.data.map((row) =>
            Object.prototype.toString
              .call(row[accessor])
              .split(" ")[1]
              .slice(0, -1)
          )
        );
        columnTypes.delete("undefined");
        if (columnTypes.size == 1)
          _types[accessor] = columnTypes.values().next().value?.toLowerCase();

        const isDateColumn = _types[accessor] === "date";
        const isNumberColumn = _types[accessor] === "number";
        const isBooleanColumn = _types[accessor] === "boolean";

        const columnDef: ColumnDef<unknown, unknown> = {
          accessorKey: accessor,
          filterFn: isDateColumn
            ? DateFilterFunction
            : isNumberColumn
            ? NumberFilterFunction
            : ArrayFilterFunction,
          header: ({ table, column }) => (
            <HeaderCell
              table={table}
              column={column}
              label={_headers[accessor].props.children}
              icon={_headers[accessor].props.icon}
              enableSorting={_headers[accessor].props.enableSorting}
              enableFiltering={_headers[accessor].props.enableFiltering}
              enableGrouping={_headers[accessor].props.enableGrouping}
              isDateColumn={isDateColumn}
              isNumberColumn={isNumberColumn}
              displayValueFunction={
                _headers[accessor].props.displayValueFunction
              }
            />
          ),
        };

        if (rowCells[accessor] != undefined) {
          columnDef.cell = ({ row }) => {
            let cellValue =
              rowCells[accessor].props.valueEditFunction != undefined
                ? rowCells[accessor].props.valueEditFunction(
                    row.getValue(accessor)
                  )
                : isDateColumn
                ? CoreDateToString(row.getValue(accessor))
                : row.getValue(accessor);
            const cellChildren =
              rowCells[accessor].props.children?.length > 0
                ? rowCells[accessor].props.children
                : cellValue;
            if (!Array.isArray(cellChildren)) return cellChildren; //If there is only one child the children array is not constructed (react behavior) so we return it directly
            return rowCells[accessor].props.children?.map((child: any) =>
              isComponent(child, CellRawValue) ? cellValue : child
            );
          };

          if (rowCells[accessor].props.sortingFunction != undefined) {
            columnDef.sortingFn = (
              rowA: Row<any>,
              rowB: Row<any>,
              columnId: string
            ) =>
              rowCells[accessor].props.sortingFunction(
                rowA.original[columnId],
                rowB.original[columnId]
              );
          }
        } else {
          if (isNumberColumn) {
            columnDef.cell = ({ row }) => (
              <span className="text-right w-full pr-2">
                {row.getValue(accessor)}
              </span>
            );
          } else if (isBooleanColumn) {
            columnDef.cell = ({ row }) => (
              <div className="justify-center flex w-full">
                {row.getValue(accessor) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
              </div>
            );
          } else if (isDateColumn) {
            columnDef.cell = ({ row }) =>
              CoreDateToString(row.getValue(accessor));
          }
        }

        columnDef.getGroupingValue = (row: any) =>
          ObjectToString(row[accessor]);

        return columnDef;
      }
    );

    if (props.enableRowSelection === true && _columns.length > 0)
      _columns.push(selectColumn);

    setCaption(_caption);
    setHeaders(_headers);
    setDisplayedAccessors(_displayedAccessors);
    setTypes(_types);
    setColumns(_columns);
    setOnRowClick(() => _advancedTableBodyRow?.props?.onRowClick);
  }, [props.children, props.data, props.enableRowSelection]);

  useEffect(
    () => setPageCount(tableRef.current ? tableRef.current.getPageCount() : 1),
    [globalFilter, pagination]
  );

  const prepareRowDataForExport = (row: any) =>
    displayedAccessors.map((accessor) => {
      const value = row[accessor];
      return types[accessor] === "object"
        ? JSON.stringify(value, (_key: string, value: unknown) =>
            value === null ? "" : value
          )
        : value;
    });

  const getHeadersForExport = (): Array<string> =>
    displayedAccessors.map((accessor) => headers[accessor].props.children);
  const getRowsForExport = (): Array<Array<any>> =>
    (tableRef.current ? tableRef.current.getFinalData() : []).map(
      prepareRowDataForExport
    );

  return (
    <>
      <span className="flex items-center">
        { props.enableGeneralSearch !== false &&
          <Input
            className="max-w-[40%] w-full mr-auto ml-0"
            placeholder="Rechercher"
            onChange={(e) => {
              setGlobalFilter(e.target.value);
            }}
          />
        }
        { props.onAdd && (
          <Button
            id="add_element"
            title="Ajouter"
            variant={"outline"}
            className="h-9 w-9 p-2 mt-1"
            onClick={props.onAdd}
          >
            <Plus />
          </Button>
        )}
        {props.enableExport?.includes("csv") && (
          <Button
            id="download_csv"
            title="Télécharger en csv"
            variant={"outline"}
            className="h-9 w-9 p-2 mt-1"
            disabled={isExportButtonDisabled}
            onClick={async (e) => {
              if (isExportButtonDisabled) return;
              setIsExportButtonDisabled(true);

              new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    getRowsForExport().map((row) =>
                      row
                        .map((v) =>
                          v instanceof Date ? CoreDateToString(v) : v
                        )
                        .join(";")
                    )
                  );
                }, 0);
              })
                .then((result) => {
                  const headingsRow = getHeadersForExport().join(";");
                  const contentRows: string[] = result as string[];
                  const csvDataString = [headingsRow, ...contentRows].join(
                    "\r\n"
                  );

                  const universalBom = "\uFEFF";
                  const blobParts = [universalBom + csvDataString];
                  const blobOptions: BlobPropertyBag = {
                    type: "text/csv;charset=UTF-8",
                  };

                  const file = new Blob(blobParts, blobOptions);
                  const link = document.createElement("a");

                  link.href = window.URL.createObjectURL(file);
                  link.download = `${
                    sanitizeFileName(caption) +
                    " " +
                    DateToFileString(new Date())
                  }.csv`;
                  link.click();
                })
                .catch((err) => console.log("Error writing csv export", err))
                .finally(() => setIsExportButtonDisabled(false));
            }}
          >
            <Download />
          </Button>
        )}
        {props.enableExport?.includes("xlsx") && (
          <Button
            id="download_xlsx"
            title="Télécharger en xlsx"
            variant={"outline"}
            className="h-9 w-9 p-2 mt-1 ml-2"
            disabled={isExportButtonDisabled}
            onClick={async (e) => {
              if (isExportButtonDisabled) return;
              setIsExportButtonDisabled(true);

              const headingsRow = getHeadersForExport();
              const contentRows = getRowsForExport();

              const workbook = new ExcelJS.Workbook();
              const worksheet = workbook.addWorksheet("Sheet1");

              worksheet.addRow(headingsRow);
              contentRows.forEach((row) => {
                worksheet.addRow(row);
              });

              workbook.xlsx
                .writeBuffer()
                .then((buffer) => {
                  const blobOptions: BlobPropertyBag = {
                    type: "application/vnd.ms-excel",
                  };

                  const file = new Blob([buffer], blobOptions);
                  const link = document.createElement("a");

                  link.href = window.URL.createObjectURL(file);
                  link.download = `${
                    sanitizeFileName(caption) +
                    " " +
                    DateToFileString(new Date())
                  }.xlsx`;
                  link.click();
                })
                .catch((err) => console.log("Error writing excel export", err))
                .finally(() => setIsExportButtonDisabled(false));
            }}
          >
            <Download />
          </Button>
        )}
      </span>
      {isExportButtonDisabled && (
        <span className="flex items-center text-xs mt-2">
          <span className="ml-auto mr-auto">Export en cours...</span>
        </span>
      )}
      <div className="mb-3"></div>

      <TanstackTableImplementation
        ref={tableRef}
        columns={columns}
        data={props.data}
        className={props.className}
        globalFilterValue={globalFilter}
        pagination={pagination}
        setPagination={setPagination}
        onRowClick={onRowClick}
      />

      { props.showFooter !== false &&
        <div
          className="flex w-full items-center text-xs mt-2 h-fit"
          style={{ justifyContent: "space-between", position: "relative" }}
        >
          <div>
            {pagination.pageIndex * pagination.pageSize + 1}-
            {Math.min(
              pagination.pageSize * (pagination.pageIndex + 1),
              tableRef.current ? tableRef.current.getFilteredDataSize() : 0
            )}{" "}
            sur {tableRef.current ? tableRef.current.getFilteredDataSize() : 0}{" "}
            résultats
          </div>

          <div
            className="flex items-center"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Button
              variant={"ghost"}
              className="p-1 h-fit"
              onClick={() => {
                if (tableRef.current) tableRef.current.goToFirstPage();
              }}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              variant={"ghost"}
              className="p-1 h-fit"
              onClick={() => {
                if (tableRef.current) tableRef.current.previousPage();
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Select
              value={String(pagination.pageIndex)}
              onValueChange={(value) => {
                if (tableRef.current)
                  tableRef.current.setPageIndex(Number(value));
              }}
            >
              <SelectTrigger className="min-w-0 text-xs h-[2em]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-0 w-full">
                {Array.from({ length: pageCount }, (_, index) => (
                  <SelectItem
                    key={`select_page_${index}`}
                    className="text-xs"
                    value={String(index)}
                  >
                    {String(index + 1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={"ghost"}
              className="p-1 h-fit"
              onClick={() => {
                if (tableRef.current) tableRef.current.nextPage();
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant={"ghost"}
              className="p-1 h-fit"
              onClick={() => {
                if (tableRef.current) tableRef.current.goToLastPage();
              }}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center">
            Résultats par page
            <Select
              onValueChange={(value) => {
                if (tableRef.current) {
                  tableRef.current.setPageSize(Number(value));
                }
              }}
              defaultValue={String(pagination.pageSize)}
            >
              <SelectTrigger className="min-w-0 w-fit text-xs h-[2em]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-0 w-full">
                <SelectItem className="text-xs" value="5">
                  5
                </SelectItem>
                <SelectItem className="text-xs" value="10">
                  10
                </SelectItem>
                <SelectItem className="text-xs" value="15">
                  15
                </SelectItem>
                <SelectItem className="text-xs" value="20">
                  20
                </SelectItem>
                <SelectItem className="text-xs" value="25">
                  25
                </SelectItem>
                <SelectItem className="text-xs" value="50">
                  50
                </SelectItem>
                <SelectItem className="text-xs" value="100">
                  100
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      }
    </>
  );
};

export default AdvancedTable;
