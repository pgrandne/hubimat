import { ReactElement, ReactNode, useState } from "react";
import React from "react";
import { Column, Table } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Group } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import FilterDate from "./FilterDate";
import { ObjectToString } from "./AdvancedTable";
import FilterList from "./FilterList";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { isDate } from "./FilterDate";


export default function HeaderCell({
  table,
  column,
  label = "default",
  icon,
  enableSorting = true,
  enableFiltering = true,
  enableGrouping = true,
  displayValueFunction = ObjectToString,
}: {
  table: Table<any>;
  column: Column<any, unknown>;
  label?: ReactNode;
  icon?: ReactElement;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableGrouping?: boolean;
  displayValueFunction?: Function;
}) {
  const [rotateChevron, setRotateChevron] = useState(false);

  // Will these scale well ???
  const columnValuesCounted: [string, { count: number; displayValue: string }][] = Object.entries(
    table.getCoreRowModel()
      .rows.map((r: any) => r.getValue(column.id))
      .reduce(
        (cnt: any, cur: any) => (
          (cnt[ObjectToString(cur)] = {
            count: cnt[ObjectToString(cur)]?.count + 1 || 1,
            displayValue: displayValueFunction(cur),
          }),
          cnt
        ),
        {}
      )
  )
  const isDateColumn = table.getCoreRowModel().rows.some((r: any) => isDate(r.getValue(column.id)))

  const headerDisplay = (
    <div className="py-2 px-1 font-semibold text-sm flex items-center">
        {icon != undefined && React.cloneElement(icon, { className: "mr-2 h-5 w-7 opacity-70" })}
        {label}
    </div>
  );

  return enableSorting || enableGrouping || enableFiltering ? (
    <DropdownMenu onOpenChange={(open) => setRotateChevron(open)}>
      <DropdownMenuTrigger>
        {/* <Button
                variant="ghost"
                className="ml-2 h-7 w-7 p-0"
                title="Ouvrir le menu"
                > */}
        <span className="flex items-center ml-2 mr-2" title="Ouvrir le menu">
            {headerDisplay}
            <ChevronDown className="h-4 w-4" style={{ transform: rotateChevron ? "rotate(180deg)" : "rotate(0)", transition: "all 0.2s linear" }}/>
        </span>
        
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {enableSorting && (
          <>
            <DropdownMenuLabel>Grouper</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => column.toggleGrouping()}>
              {column.getIsGrouped()
                ? "Dégrouper"
                : 'Grouper par "' + label + '"'}
              {/* <Switch checked={column.getIsGrouped()} onCheckedChange={() => column.toggleGrouping()} className="mr-2"/>
                                    <Label htmlFor="group-by">Grouper par "{label}"</Label> */}
            </DropdownMenuItem>
          </>
        )}
        {enableGrouping && (
          <>
            <DropdownMenuLabel>Trier</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown />
              Par ordre alphabétique
            </DropdownMenuItem>
          </>
        )}
        {enableFiltering && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filtrer</DropdownMenuLabel>
            {isDateColumn ? (
              <FilterDate column={column} />
            ) : (
              <FilterList
                column={column}
                columnValuesCounted={columnValuesCounted}
              />
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    headerDisplay
  );
}
