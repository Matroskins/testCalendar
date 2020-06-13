import React, { useContext } from "react";
import { EventsCalendarContext } from "../context/EventsCalendarContext";
import { ReactComponent as LeftArrow } from "./images/leftArrow.svg";
import { ReactComponent as RightArrow } from "./images/rightArrow.svg";
import { Button } from "../../../ui";

interface ISwitchBetweenMonthProps {}

const SwitchBetweenMonth: React.FunctionComponent<ISwitchBetweenMonthProps> = (
  props
) => {
  const { onGoToTheCurrentMonth, setNextMonth, setPreviousMonth } = useContext(
    EventsCalendarContext
  );
  return (
    <div
      style={{
        display: "flex",
        width: 66,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <LeftArrow style={{ cursor: "pointer" }} onClick={setPreviousMonth} />
      <Button
        additionalStyle={{ cursor: "pointer" }}
        onClick={onGoToTheCurrentMonth}
        text={"Today"}
      />
      <RightArrow style={{ cursor: "pointer" }} onClick={setNextMonth} />
    </div>
  );
};

export default SwitchBetweenMonth;
