import { ReactElement, ReactNode, useState } from "react";
import React from "react";
import { Column, Table } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowDown10,
  ArrowDownAZ,
  ArrowUp,
  ArrowUp10,
  ArrowUpAZ,
  ChevronDown,
  Funnel,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ObjectToString } from "./AdvancedTable";
import FilterDate from "./FilterDate";
import FilterList from "./FilterList";
import FilterNumber from "./FilterNumber";

export default function HeaderCell({
  table,
  column,
  label = "default",
  icon,
  enableSorting = true,
  enableFiltering = true,
  enableGrouping = true,
  displayValueFunction = (object: any) =>
    object == undefined ? "Vide" : ObjectToString(object),
  isDateColumn = false,
  isNumberColumn = false,
}: {
  table: Table<any>;
  column: Column<any, unknown>;
  label?: ReactNode;
  icon?: ReactElement;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableGrouping?: boolean;
  displayValueFunction?: Function;
  isDateColumn?: boolean;
  isNumberColumn?: boolean;
}) {
  const [columnFilter, setColumnFilter] = useState(column.getFilterValue());
  const [rotateChevron, setRotateChevron] = useState(false);
  const [menuContentCss, setMenuContentCss] = useState<string>();
  const [menuContentCssUpdated, setMenuContentCssUpdated] = useState(false);

  const headerDisplay = (
    <div className="py-2 font-semibold text-sm text-left flex items-center w-full">
      {icon != undefined &&
        React.cloneElement(icon, {
          className: "mr-2 h-5 w-7 opacity-70",
        } as React.HTMLAttributes<HTMLElement>)}
      {label}
    </div>
  );

  const menuContentInstantRef = (node: HTMLDivElement | null) => {
    if (node && !menuContentCssUpdated) {
      const rect = node.getBoundingClientRect();
      const visibleHeight = Math.max(
        0,
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      );
      const intersectionRatio = visibleHeight / rect.height;

      if (intersectionRatio > 0 && intersectionRatio < 1) {
        setMenuContentCss(
          "[data-radix-menu-content] {\
            max-height: " +
            String(rect.height * intersectionRatio) +
            "px !important;\
            overflow-y: scroll; \
          }"
        );
        setMenuContentCssUpdated(true);
      } else if (rect.height > 630) {
        setMenuContentCss(
          "[data-radix-menu-content] { max-height: 630px !important; overflow-y: scroll; }"
        );
        setMenuContentCssUpdated(true);
      }
    }
  };

  return enableSorting || enableGrouping || enableFiltering ? (
    <DropdownMenu
      onOpenChange={(open) => {
        setRotateChevron(open);
        if (!open) {
          setMenuContentCssUpdated(false);
          setMenuContentCss(undefined);
          setColumnFilter(column.getFilterValue()); // If columnFilter has been modified but not applied, we reset it
        }
      }}
    >
      <DropdownMenuTrigger>
        <span
          className="flex items-center ml-2 mr-2 w-full pr-2"
          title="Ouvrir le menu"
        >
          {headerDisplay}

          <div className="flex">
            {column.getIsSorted() && column.getIsFiltered() ? (
              <>
                <Funnel className="h-3 w-3" />
                {column.getIsSorted() === 'asc'
                  ? <ArrowDown className="h-3 w-3" />
                  : <ArrowUp className="h-3 w-3" />}
              </>
            ) : column.getIsSorted() ? (
              column.getIsSorted() === 'asc'
                ? <ArrowDown className="h-4 w-4" />
                : <ArrowUp className="h-4 w-4" />
            ) : column.getIsFiltered() ? (
              <Funnel className="h-3*4 w-4" />
            ) : (
              <ChevronDown
                className="h-4 w-4"
                style={{
                  transform: rotateChevron ? "rotate(180deg)" : "rotate(0)",
                  transition: "all 0.2s linear",
                }}
              />
            )}
          </div>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={menuContentInstantRef}
        onKeyDown={(e) => {
          if (e.key == "Enter" && columnFilter != column.getFilterValue())
            column.setFilterValue(columnFilter);
        }}
      >
        <style>{menuContentCss}</style>
        {enableSorting && (
          <>
            <DropdownMenuLabel>Grouper</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => column.toggleGrouping()}>
              {column.getIsGrouped()
                ? "Dégrouper"
                : 'Grouper par "' + label + '"'}
            </DropdownMenuItem>
          </>
        )}
        {enableGrouping && (
          <>
            <DropdownMenuLabel>Trier</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              {isNumberColumn ? (
                <>
                  <ArrowUp10 className="mr-2" /> Par ordre croissant{" "}
                </>
              ) : (
                <>
                  <ArrowDownAZ className="mr-2" /> De A à Z{" "}
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              {isNumberColumn ? (
                <>
                  <ArrowDown10 className="mr-2" /> Par ordre décroissant{" "}
                </>
              ) : (
                <>
                  <ArrowUpAZ className="mr-2" /> De Z à A{" "}
                </>
              )}
            </DropdownMenuItem>
            {column.getIsSorted() && (
              <DropdownMenuItem onClick={() => column.clearSorting()}>
                <X className="mr-2" /> Enlever le tri
              </DropdownMenuItem>
            )}
          </>
        )}
        {enableFiltering && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filtrer</DropdownMenuLabel>
            {isDateColumn ? (
              <FilterDate
                columnFilter={columnFilter}
                setColumnFilter={setColumnFilter}
              />
            ) : (
              <>
                {isNumberColumn && (
                  <FilterNumber
                    columnFilter={columnFilter}
                    setColumnFilter={setColumnFilter}
                  />
                )}
                <FilterList
                  columnFilter={columnFilter}
                  setColumnFilter={setColumnFilter}
                  columnValuesCounted={
                    // Will this scale well ???
                    Object.entries(
                      column.getFacetedRowModel().rows.reduce(
                        (cnt: any, cur: any) => (
                          (cnt[ObjectToString(cur.getValue(column.id))] = {
                            count:
                              cnt[ObjectToString(cur.getValue(column.id))]
                                ?.count + 1 || 1,
                            displayValue: displayValueFunction(
                              cur.getValue(column.id)
                            ),
                          }),
                          cnt
                        ),
                        {}
                      )
                    )
                  }
                  forceUpdate={(filterValue: Array<string> | undefined) =>
                    column.setFilterValue(filterValue)
                  }
                />
              </>
            )}
            {column.getFilterValue() != columnFilter && (
              <DropdownMenuItem
                className="border my-2 mx-3"
                onClick={() => column.setFilterValue(columnFilter)}
              >
                <span className="mx-auto">Appliquer le filtre</span>
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    headerDisplay
  );
}
