"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const CalendarButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="bg-transparent border-0 hover:bg-transparent"
          variant="outline"
        >
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto pt-4" align="start">
        <Calendar
          mode="single"
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          // initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
