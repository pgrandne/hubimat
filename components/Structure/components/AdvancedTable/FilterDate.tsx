import { DatePicker } from "@/components/ui/date-picker";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Column } from "@tanstack/react-table";
import { useState } from "react";
import { disablingProps } from "./DisableDropDownMenuItem";

const toDate = (object: any): Date | undefined => {
    if (typeof object?.getMonth === 'function') {
        try { return object } catch (error) {}
    }
    return undefined
}
const toDateRange = (unknown: any) => {
    return {"start": unknown?.start, "end": unknown?.end}
}

export type DateRangeType = {"start": Date | undefined, "end": Date | undefined}

export const DateFilterFunction = (row: any, columnId: string, filterValue: Date | DateRangeType) => {
    const date : Date = row.original[columnId]
    const filterValueDate = toDate(filterValue)
    const filterValueRange = toDateRange(filterValue)

    return filterValueDate != undefined
      ? date.getDate() === filterValueDate.getDate() && date.getMonth() === filterValueDate.getMonth() && date.getFullYear() == filterValueDate.getFullYear()
      : filterValueRange.start <= date && date <= filterValueRange.end
}

export const isDate = (object: any) : boolean => (toDate(object) != undefined)

export default function FilterDate({
  column,
}: {
  column: Column<any, unknown>;
}) {
  const [filterSelected, setSelectedFilter] = useState(column.getFilterValue() == undefined ? "all" : toDateRange(column.getFilterValue()).start != undefined ? "range" : "specific");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(toDate(column.getFilterValue()));
  const [selectedRange, setSelectedRange] = useState<DateRangeType>(toDateRange(column.getFilterValue()))

  return (
    <>
      <DropdownMenuItem {...disablingProps}>
        <Select
          onValueChange={
              (value) => {
                  if (value == "all") column.setFilterValue(undefined)
                  if (value == "range") column.setFilterValue([undefined, undefined])
                  setSelectedFilter(value)
              }
          }
          defaultValue={filterSelected}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Sélectionner tout</SelectItem>
              <SelectItem value="specific">Date spécifique</SelectItem>
              <SelectItem value="range">Période</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </DropdownMenuItem>
      
      {filterSelected == "specific" && (
        <DropdownMenuItem {...disablingProps}>
          <DatePicker setDate={(date) => {
            setSelectedDate(date)
            column.setFilterValue(date)
          }} date={selectedDate} />
        </DropdownMenuItem>
      )}
      {filterSelected == "range" && (
      <>
        <DropdownMenuItem {...disablingProps}>
          <DatePicker setDate={(date) => {
            setSelectedRange({"start": date, "end": selectedRange.end})
            column.setFilterValue({"start": date, "end": selectedRange.end})
            }} date={selectedRange.start} />
        </DropdownMenuItem>
        <DropdownMenuItem {...disablingProps}>
          <DatePicker setDate={(date) => {
            setSelectedRange({"start": selectedRange.start, "end": date})
            column.setFilterValue({"start": selectedRange.start, "end": date})
          }} date={selectedRange.end} />
        </DropdownMenuItem>
      </>)}
    </>
)
}
