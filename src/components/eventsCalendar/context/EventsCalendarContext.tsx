import React, { useReducer, useCallback, useEffect } from "react";
import moment from "moment";
import { getUpdatedMonthEvents, getMonthName } from "../../utils";
import {
  addEventOnDay_api,
  getMonthEventsFromStorage_api,
  clearAllEvents_api,
  deleteEvent_api,
} from "../../../backendSimulation/api";
import { reducer } from "./reducer";
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
  onDeleteEvent: (dayEvent: IDayEvent) => void;
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
    clearAllEvents_api();
  }, []);
  const onAddEventOnDay = useCallback(
    (newEvent: IDayEvent) => {
      dispatch({
        type: "add event on day",
        payload: { newEvent },
      });
      const getEvent = (monthEvents: IDayEvents[], id: number): IDayEvent => {
        const dayWithEvents = monthEvents.find((dayEvent) =>
          dayEvent.events.some((event) => event.id === id)
        );
        if (!!dayWithEvents) {
          return {
            date: dayWithEvents.date,
            event: dayWithEvents.events.find((event) => event.id === id),
          };
        }
        return null;
      };
      const checkIsEventHasAnotherDay = (
        monthEvents: IDayEvents[],
        newEvent: IDayEvent
      ) => {
        const prevEvent = getEvent(monthEvents, newEvent.event.id);
        return (
          !!prevEvent && !moment(prevEvent?.date).isSame(newEvent.date, "day")
        );
      };
      if (checkIsEventHasAnotherDay(state.monthEvents, newEvent)) {
        const prevEventData = getEvent(state.monthEvents, newEvent.event.id);
        deleteEvent_api(prevEventData);
      }
      addEventOnDay_api(newEvent, state.currentMonthName, state.currentYear);
    },
    [state.currentMonthName, state.currentYear, state.monthEvents]
  );
  const onGoToTheCurrentMonth = useCallback(() => {
    dispatch({ type: "go to current month" });
  }, []);
  const onDeleteEvent = useCallback((dayEvent: IDayEvent) => {
    dispatch({ type: "delete event", payload: { id: dayEvent.event.id } });
    deleteEvent_api(dayEvent);
  }, []);

  useEffect(() => {
    dispatch({
      type: "initialize month events",
      payload: {
        monthEvents: getMonthEventsFromStorage_api({
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
