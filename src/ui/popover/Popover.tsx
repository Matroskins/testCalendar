import React, { useContext, FC } from "react";
import EventPopover from "../../components/eventPopover/EventPopover";
import { PopoverContext } from "./PopoverContext";
import { IPopoverNames } from "./models";

export const Popover: FC<{}> = (props) => {
  const { popoverData, onClosePopover } = useContext(PopoverContext);
  if (
    !!popoverData.coordinate.x &&
    !!popoverData.coordinate.y &&
    !!popoverData
  ) {
    return (
      <div
        style={{
          position: "fixed",
          left: popoverData.coordinate.x,
          top: popoverData.coordinate.y,
        }}
      >
        {popoverData[IPopoverNames.EventPopover] && (
          <EventPopover
            dayEvent={popoverData[IPopoverNames.EventPopover].dayEvent}
            onClosePopover={onClosePopover}
          />
        )}
      </div>
    );
  }
  return <div />;
};
