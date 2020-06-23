import React, { useContext, useMemo } from "react";
import { useSpring, animated } from "react-spring";
import moment from "moment";
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
  const animationProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const daysWithEvents = useMemo<IDayEvents[]>(
    () => getMonthDaysWithEvents(monthEvents, currentMonthName, currentYear),
    [monthEvents, currentMonthName, currentYear]
  );
  return (
    <Grid
      titles={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
      gridElements={daysWithEvents}
      elementGrid={(squareProps) => (
        <div
          key={`${squareProps.key}${moment(squareProps.elementData.date).format(
            "DD-MM-YYYY"
          )}`}
        >
          {/* <animated.div style={animationProps}> */}
          <DaySquare elementData={squareProps.elementData} />
          {/* </animated.div> */}
        </div>
      )}
    />
  );
};

export default CalendarGrid;
