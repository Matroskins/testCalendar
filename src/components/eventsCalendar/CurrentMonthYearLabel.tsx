import React, { useContext, FC } from "react";
import { EventsCalendarContext } from "./context/EventsCalendarContext";
import { Title } from "../../ui";

const CurrentMonthYearLabel: FC<{}> = (props) => {
  const { currentYear, currentMonthName } = useContext(EventsCalendarContext);
  return <Title text={`${currentMonthName} ${currentYear}`} />;
};

export default CurrentMonthYearLabel;
