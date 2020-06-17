import React, { useContext, MouseEvent, FC, useMemo } from "react";
import moment, { Moment } from "moment";
import { Text, PopoverContext } from "../../ui";
import { checkIsDayInMonth } from "./utils";
import { IDayEvents, IEventData } from "../models";
import { IPopoverNames } from "../../ui/popover/models";
import { EventsCalendarContext } from "./context/EventsCalendarContext";
import { el } from "date-fns/locale";

interface IDaySquare {
  elementData: IDayEvents;
}

interface IEventReactangle {
  eventData: IEventData;
  isDayInCurrentMonth: boolean;
  dayDate: Moment;
}
const EventRectangle: FC<IEventReactangle> = ({
  eventData,
  isDayInCurrentMonth,
  dayDate,
}) => {
  const { onOpenPopover } = useContext(PopoverContext);

  const handleOpenPopover = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onOpenPopover({
      coordinate: {
        x: e.currentTarget.getBoundingClientRect().left + 85,
        y: e.currentTarget.getBoundingClientRect().top - 15,
      },
      [IPopoverNames.EventPopover]: {
        dayEvent: { date: dayDate, event: eventData },
      },
    });
  };
  return (
    <div
      onClick={isDayInCurrentMonth && handleOpenPopover}
      style={{
        marginTop: 5,
        backgroundColor: "#2591ED",
        minHeight: 20,
        textAlign: "center",
        opacity: isDayInCurrentMonth ? 1 : 0.5,
        color: "white",
        whiteSpace: "nowrap",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <Text
        additionalStyle={{ color: "white", paddingLeft: 3 }}
        text={`${moment(eventData.hoursMinutes).format("HH:mm")} ${
          eventData.title
        }`}
      />
    </div>
  );
};
export const DaySquare: FC<IDaySquare> = ({ elementData }) => {
  // console.log(elementData.date.format("HH:mm"));
  const { onOpenPopover } = useContext(PopoverContext);
  const { currentMonthName } = useContext(EventsCalendarContext);
  const isDayInCurrentMonth = useMemo(
    () => checkIsDayInMonth(elementData.date, currentMonthName),
    [currentMonthName, elementData.date]
  );

  const onClickElement = (e: MouseEvent<HTMLElement>) => {
    console.log("onClickElement " + elementData.date.format("HH:mm"));
    onOpenPopover({
      coordinate: {
        x: e.currentTarget.getBoundingClientRect().left + 85,
        y: e.currentTarget.getBoundingClientRect().top - 15,
      },
      [IPopoverNames.EventPopover]: {
        dayEvent: {
          date: elementData.date,
          event: {
            id: Math.ceil(Math.random() * 1000),
            title: "",
            hoursMinutes: elementData.date,
            description: "",
          },
        },
      },
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        maxWidth: 85,
        width: 85,
        height: 85,
        maxHeight: 85,
        display: "flex",
        opacity: isDayInCurrentMonth ? 1 : 0.5,
        justifyContent: "flex-end",
        flexDirection: "column",
        border: "1px solid #F2F2F2",
        boxSizing: "border-box",
        position: "relative",
      }}
      onClick={isDayInCurrentMonth && onClickElement}
    >
      <div
        style={{
          position: "absolute",
          top: 5,
          opacity: isDayInCurrentMonth ? 1 : 0.5,
          right: 5,
        }}
      >
        <span>{moment(elementData.date).date()}</span>
      </div>
      <div
        style={
          elementData.events.length === 1
            ? {
                position: "absolute",
                top: "50%",
                width: "100%",
                transform: "translateY(-50%)",
              }
            : {
                height: "77%",
                display: "flex",
                overflow: "auto",
                flexDirection: "column",
              }
        }
      >
        {elementData.events.map((eventData) => (
          <EventRectangle
            key={eventData.id}
            eventData={eventData}
            isDayInCurrentMonth={isDayInCurrentMonth}
            dayDate={elementData.date}
          />
        ))}
      </div>
    </div>
  );
};
