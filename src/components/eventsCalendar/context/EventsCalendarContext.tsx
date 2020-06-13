import React, { useReducer, useCallback, useEffect } from "react";
import moment from "moment";
import { getUpdatedMonthEvents, getMonthName } from "../../utils";
import { addUpdatedMonthEventsToAllEvents } from "./utils";
import { clearAllEvents } from "../../../backendSimulation/api";
import { reducer } from "./reducer";
import { getMonthEventsFromStorage } from "../../../backendSimulation/api";
import { IDayEvents, IDayEvent } from "../../models";

interface IDayEventsCalendarContext {
  currentMonthName: string;
  monthEvents: IDayEvents[];
  currentYear: number;
  setPreviousMonth: () => void;
  setNextMonth: () => void;
  onRemoveAllEvents: () => void;
  onAddEventOnDay: (newEvent: IDayEvent) => void;
  onGoToTheCurrentMonth: () => void;
  onDeleteEvent: (id: number) => void;
}

export const EventsCalendarContext = React.createContext<
  IDayEventsCalendarContext
>({
  currentMonthName: "",
  monthEvents: [],
  currentYear: 2020,
  setPreviousMonth: () => console.log("method did not initialize"),
  setNextMonth: () => console.log("method did not initialize"),
  onRemoveAllEvents: () => console.log("method did not initialize"),
  onAddEventOnDay: (newEvent: IDayEvent) =>
    console.log("method did not initialize"),
  onGoToTheCurrentMonth: () => console.log("method did not initialize"),
  onDeleteEvent: () => console.log("method did not initialize"),
});

const eventsCalendatInitialState = {
  currentMonthName: getMonthName(moment()),
  currentYear: 2020,
  monthEvents: [],
};

export const EventsCalendarProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, eventsCalendatInitialState);

  const setPreviousMonth = useCallback(() => {
    dispatch({ type: "go to prev month" });
  }, []);
  const setNextMonth = useCallback(
    () => dispatch({ type: "go to next month" }),
    []
  );
  const onRemoveAllEvents = useCallback(() => {
    dispatch({ type: "clear month events" });
    clearAllEvents();
  }, []);
  const onAddEventOnDay = useCallback(
    (newEvent: IDayEvent) => {
      dispatch({
        type: "add event to day",
        payload: { newEvent },
      });
      const monthEvents = getMonthEventsFromStorage({
        currentYear: state.currentYear,
        currentMonthName: state.currentMonthName,
      });

      const monthEventsWithNewEvent = getUpdatedMonthEvents({
        monthEvents,
        newEvent,
      });

      addUpdatedMonthEventsToAllEvents(
        monthEventsWithNewEvent,
        state.currentYear,
        state.currentMonthName,
        newEvent
      );
    },
    [state.currentMonthName, state.currentYear]
  );
  const onGoToTheCurrentMonth = useCallback(() => {
    dispatch({ type: "go to current month" });
  }, []);
  const onDeleteEvent = useCallback((id: number) => {
    dispatch({ type: "delete event", payload: { id } });
  }, []);

  useEffect(() => {
    dispatch({
      type: "initialize month events",
      payload: {
        monthEvents: getMonthEventsFromStorage({
          currentMonthName: state.currentMonthName,
          currentYear: state.currentYear,
        }),
      },
    });
  }, [state.currentMonthName, state.currentYear]);

  return (
    <EventsCalendarContext.Provider
      value={{
        monthEvents: state.monthEvents,
        currentMonthName: state.currentMonthName,
        currentYear: state.currentYear,
        setPreviousMonth,
        setNextMonth,
        onRemoveAllEvents,
        onAddEventOnDay,
        onGoToTheCurrentMonth,
        onDeleteEvent,
      }}
    >
      {props.children}
    </EventsCalendarContext.Provider>
  );
};
