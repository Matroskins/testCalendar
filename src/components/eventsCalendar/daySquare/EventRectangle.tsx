import React, { useContext, MouseEvent, FC } from "react";
import moment, { Moment } from "moment";
import { Text, PopoverContext } from "../../../ui";
import { IDayEvents, IEventData } from "../../models";
import { IPopoverNames } from "../../../ui/popover/models";

interface IDaySquare {
  elementData: IDayEvents;
}

interface IEventReactangle {
  eventData: IEventData;
  isDayInCurrentMonth: boolean;
  dayDate: Moment;
}
export const EventRectangle: FC<IEventReactangle> = ({
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
