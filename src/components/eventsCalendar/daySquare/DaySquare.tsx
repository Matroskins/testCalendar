import React, { useContext, MouseEvent, FC, useMemo } from "react";
import moment from "moment";
import { useSpring, animated } from "react-spring";
import { PopoverContext } from "../../../ui";
import { checkIsDayInMonth } from "../utils";
import { IDayEvents } from "../../models";
import { IPopoverNames } from "../../../ui/popover/models";
import { EventsCalendarContext } from "../context/EventsCalendarContext";
import { EventRectangle } from "./EventRectangle";

interface IDaySquare {
  elementData: IDayEvents;
}

export const DaySquare: FC<IDaySquare> = ({ elementData }) => {
  const { onOpenPopover } = useContext(PopoverContext);
  const { currentMonthName } = useContext(EventsCalendarContext);
  const isDayInCurrentMonth = useMemo(
    () => checkIsDayInMonth(elementData.date, currentMonthName),
    [currentMonthName, elementData.date]
  );
  const animationProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const onClickElement = (e: MouseEvent<HTMLElement>) => {
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
    <animated.div style={animationProps}>
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
    </animated.div>
  );
};
