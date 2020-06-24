import React, { useContext, useMemo, FC } from "react";
import moment from "moment";
import { GridTitles } from "./CalendarGridTitles";
import { Grid } from "../../ui/grid";
import { EventsCalendarContext } from "./context/EventsCalendarContext";
import { getMonthDaysWithEvents } from "./utils";
import { DaySquare } from "./daySquare/DaySquare";
import { IDayEvents } from "../models";

interface ICalendarGridProps {}

const calendarTitles = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CalendarGrid: FC<ICalendarGridProps> = (props) => {
  const { monthEvents, currentMonthName, currentYear } = useContext(
    EventsCalendarContext
  );
  const daysWithEvents = useMemo<IDayEvents[]>(
    () => getMonthDaysWithEvents(monthEvents, currentMonthName, currentYear),
    [monthEvents, currentMonthName, currentYear]
  );
  return (
    <div>
      <GridTitles titles={calendarTitles} />
      <Grid
        rowLength={calendarTitles.length}
        gridElements={daysWithEvents}
        elementGrid={(squareProps) => (
          <div
            key={`${squareProps.key}${moment(
              squareProps.elementData.date
            ).format("DD-MM-YYYY")}`}
          >
            <DaySquare elementData={squareProps.elementData} />
          </div>
        )}
      />
    </div>
  );
};

export default CalendarGrid;
