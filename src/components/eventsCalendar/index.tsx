import React, { FC, useMemo, useContext } from "react";
import { Button, Text, Title } from "../../ui";
import SwitchBetweenMonth from "./switchBetweenMonth";
import { EventsCalendarContext } from "./context/EventsCalendarContext";
import CalendarGrid from "./CalendarGrid";
import { getMonthEventsNumber } from "../utils";

const EventrsCalendar: FC<{}> = (props) => {
  const {
    monthEvents,
    currentMonthName,
    currentYear,
    onRemoveAllEvents,
  } = useContext(EventsCalendarContext);
  const monthEventsNumber = useMemo(() => getMonthEventsNumber(monthEvents), [
    monthEvents,
  ]);

  return (
    <div style={{ width: "fit-content", marginLeft: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title text={`${currentMonthName} ${currentYear}`} />
        <SwitchBetweenMonth />
      </div>
      <CalendarGrid />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          marginTop: 17,
          color: "#B0AFAF",
        }}
      >
        <Text text={`${monthEventsNumber} events on ${currentMonthName}`} />
        <Button
          onClick={onRemoveAllEvents}
          additionalStyle={{ color: "blue", fontSize: 11 }}
          text={"Remove all"}
        />
      </div>
    </div>
  );
};

export default EventrsCalendar;
