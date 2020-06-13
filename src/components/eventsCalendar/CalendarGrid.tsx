import React, { useContext, useMemo } from "react";
import { Grid } from "../../ui/grid";
import { EventsCalendarContext } from "./context/EventsCalendarContext";
import { getMonthDaysWithEvents } from "./utils";
import { DaySquare } from "./DaySquare";
import { IDayEvents } from "../models";

interface ICalendarGridProps {}

const CalendarGrid: React.FunctionComponent<ICalendarGridProps> = (props) => {
  const { monthEvents, currentMonthName, currentYear } = useContext(
    EventsCalendarContext
  );
  const daysWithEvents = useMemo<IDayEvents[]>(
    () => getMonthDaysWithEvents(monthEvents, currentMonthName, currentYear),
    [monthEvents, currentMonthName, currentYear]
  );

  return (
    <Grid
      titels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
      gridElements={daysWithEvents}
      elementGrid={(squareProps) => (
        <DaySquare
          elementData={squareProps.elementData}
          key={squareProps.key}
        />
      )}
    />
  );
};

export default CalendarGrid;
