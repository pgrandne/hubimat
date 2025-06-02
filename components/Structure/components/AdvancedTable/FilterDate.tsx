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

enum options {
  all="all",
  specific="specific",
  range="range"
}

export default function FilterDate({
  columnFilter,
  setColumnFilter,
  forceUpdate
}: {
  columnFilter: any
  setColumnFilter: Function
  forceUpdate: Function
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(toDate(columnFilter));
  const [selectedRange, setSelectedRange] = useState<DateRangeType>(toDateRange(columnFilter))
  const [filterSelected, setSelectedFilter] = useState<string>(columnFilter == undefined ? options.all : selectedDate != undefined ? options.specific : options.range);
  
  return (
    <>
      <DropdownMenuItem {...disablingProps}>
        <Select
          onValueChange={
              (value) => {
                  if (value == options.all) setColumnFilter(undefined)
                  if (value == options.specific && selectedDate != undefined) setColumnFilter(selectedDate)
                  if (value == options.range && selectedDate != undefined) setColumnFilter(selectedDate)
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
              <SelectItem value={options.all}>Sélectionner tout</SelectItem>
              <SelectItem value={options.specific}>Date spécifique</SelectItem>
              <SelectItem value={options.range}>Période</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </DropdownMenuItem>
      
      {filterSelected == options.specific && (
        <DropdownMenuItem {...disablingProps}>
          <DatePicker setDate={(date) => {
            setSelectedDate(date)
            setColumnFilter(date)
          }} date={selectedDate} />
        </DropdownMenuItem>
      )}
      {filterSelected == options.range && (
      <>
        <DropdownMenuItem {...disablingProps}>
          <DatePicker setDate={(date) => {
            setSelectedRange({"start": date, "end": selectedRange.end})
            setColumnFilter({"start": date, "end": selectedRange.end})
            }} date={selectedRange.start} />
        </DropdownMenuItem>
        <DropdownMenuItem {...disablingProps}>
          <DatePicker setDate={(date) => {
            setSelectedRange({"start": selectedRange.start, "end": date})
            setColumnFilter({"start": selectedRange.start, "end": date})
          }} date={selectedRange.end} />
        </DropdownMenuItem>
      </>)}
    </>
)
}
