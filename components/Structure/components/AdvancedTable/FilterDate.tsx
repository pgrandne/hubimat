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
import { DateTimePicker } from "@/components/ui/datetime-picker";

const toDate = (object: any): Date | undefined => {
    if (typeof object?.getMonth === 'function') {
        try { return object } catch (error) {}
    }
    return undefined
}
const toDateRange = (object: any) => {
    return {"start": object?.start, "end": object?.end}
}

type TimePickerType = {hour?: boolean; minute?: boolean; second?: boolean;}
type DateWithTimePickerType = {date: Date, timePicker: TimePickerType}
export type DateRangeType = {"start": Date | undefined, "end": Date | undefined}

export const DateFilterFunction = (row: any, columnId: string, filterValue: DateWithTimePickerType | DateRangeType) => {
    const date : Date = row.original[columnId]
    const filterValueDate = (filterValue as DateWithTimePickerType)?.date
    const filterTimePicker = (filterValue as DateWithTimePickerType)?.timePicker
    const filterValueRange = toDateRange(filterValue)

    return filterValueDate != undefined
      ? date.getDate() === filterValueDate.getDate() && date.getMonth() === filterValueDate.getMonth() && date.getFullYear() == filterValueDate.getFullYear()
        && (filterTimePicker.hour !== true || date.getHours() === filterValueDate.getHours())
        && (filterTimePicker.minute !== true || date.getMinutes() === filterValueDate.getMinutes())
        && (filterTimePicker.second !== true || date.getSeconds() === filterValueDate.getSeconds())
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
}: {
  columnFilter: any
  setColumnFilter: Function
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(columnFilter?.date);
  const [selectedRange, setSelectedRange] = useState<DateRangeType>(toDateRange(columnFilter))
  const [filterSelected, setSelectedFilter] = useState<string>(columnFilter == undefined ? options.all : selectedDate != undefined ? options.specific : options.range);
  const [timePicker, setTimePicker] = useState<TimePickerType>(columnFilter?.timePicker ?? {hour:false, minute:false,second:false})
  
  return (
    <>
      <DropdownMenuItem {...disablingProps}>
        <Select
          onValueChange={
              (value) => {
                  if (value == options.all) setColumnFilter(undefined)
                  if (value == options.specific && selectedDate != undefined) setColumnFilter({date: selectedDate, timePicker: timePicker})
                  if (value == options.range && selectedRange != undefined) setColumnFilter(selectedRange)
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
          <DateTimePicker value={selectedDate} timePicker={timePicker} setTimePicker={setTimePicker}
            onChange={(date) => {
              setSelectedDate(date)
              setColumnFilter({date: date, timePicker: timePicker})
            }}
          />
        </DropdownMenuItem>
      )}
      {filterSelected == options.range && (
      <>
        <DropdownMenuItem {...disablingProps}>
          <DateTimePicker value={selectedRange.start} onChange={(date) => {
            setSelectedRange({"start": date, "end": selectedRange.end})
            setColumnFilter({"start": date, "end": selectedRange.end})
            }} />
        </DropdownMenuItem>
        <DropdownMenuItem {...disablingProps}>
          <DateTimePicker value={selectedRange.end} onChange={(date) => {
            setSelectedRange({"start": selectedRange.start, "end": date})
            setColumnFilter({"start": selectedRange.start, "end": date})
          }} />
        </DropdownMenuItem>
      </>)}
    </>
)
}
