import React, { useContext, useReducer, useMemo, ChangeEvent, FC } from "react";
import { EventsCalendarContext } from "../eventsCalendar/context/EventsCalendarContext";
import { Button, Input, Textarea } from "../../ui";
import { IDayEvent } from "../models";
import { reducer } from "./reducer";
import { checkIsEventExist } from "../utils";

interface IEventPopover {
  dayEvent: IDayEvent;
  onClosePopover: () => void;
}
const EventPopover: FC<IEventPopover> = (props) => {
  const { onDeleteEvent, monthEvents, onAddEventOnDay } = useContext(
    EventsCalendarContext
  );
  const [state, dispatch] = useReducer(reducer, { dayEvent: props.dayEvent });
  const isEventExist = useMemo(
    () => checkIsEventExist(monthEvents, state.dayEvent),
    [monthEvents, state.dayEvent]
  );
  const onChangeEventTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "change field",
      payload: { updatedField: { title: e.currentTarget.value } },
    });
  };
  const onChangeEventDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "change field",
      payload: { updatedField: { description: e.currentTarget.value } },
    });
  };
  const handleSaveEvent = () => {
    onAddEventOnDay({
      ...state.dayEvent,
      event: {
        ...state.dayEvent.event,
        title:
          state.dayEvent.event.title === ""
            ? "Unassigned event title"
            : state.dayEvent.event.title,
      },
    });
    props.onClosePopover();
  };
  const handleDeleteEvent = () => {
    onDeleteEvent(state.dayEvent.event.id);
    props.onClosePopover();
  };

  return (
    <div
      style={{
        width: 126,
        height: 134,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        paddingLeft: 9,
        paddingRight: 9,
        paddingTop: 9,
        borderRadius: 10,
        boxShadow: "0px 6px 11px rgba(22, 97, 161, 0.11)",
      }}
    >
      <Input
        value={state.dayEvent?.event?.title}
        type={"text"}
        onChange={onChangeEventTitle}
        placeholder={"Unassigned event title"}
      />
      <Input
        value={state.dayEvent?.date.format("DD.MM.YYYY")}
        type={"text"}
        disabled
        additionalStyle={{ marginTop: 6 }}
      />
      <Textarea
        value={state.dayEvent.event.description}
        onChange={onChangeEventDescription}
        placeholder={"Unassigned event description"}
        additionalStyle={{ marginTop: 6, height: 60 }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Button
          onClick={handleSaveEvent}
          additionalStyle={{ color: "green" }}
          text={"Save"}
        />
        {isEventExist ? (
          <Button
            onClick={handleDeleteEvent}
            additionalStyle={{ color: "#FF727A" }}
            text={"Delete"}
          />
        ) : (
          <Button
            onClick={props.onClosePopover}
            additionalStyle={{ color: "#FF727A" }}
            text={"Close"}
          />
        )}
      </div>
    </div>
  );
};

export default EventPopover;
