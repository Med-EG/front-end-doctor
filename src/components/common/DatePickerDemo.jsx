import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateContext } from "@/context/DateContext";
import { useContext } from "react";
export function DatePickerDemo({onChange}) {
  const { date, setDate } = useContext(DateContext);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-center text-center font-bold rounded-xl p-5  shadow-lg shadow-gray-200  text-white placeholder-white",
            !date && "text-muted-foreground"
          )}
        style={{background: "linear-gradient(to left, #6fb7c9, #3d5bad)"
        }} >
          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
          {date ? format(date, "PPP") : <span className="text-white" >Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
