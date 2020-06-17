import moment from "moment";

import { IDayEvent, IDayEvents } from "../../models";
import { getUpdatedMonthEvents, getMonthName } from "../../utils";

type Action =
  | { type: "add event on day"; payload: { newEvent: IDayEvent } }
  | { type: "clear month events" }
  | { type: "go to current month" }
  | { type: "go to prev month" }
  | { type: "go to next month" }
  | {
      type: "selected event";
      payload?: IDayEvent;
    }
  | { type: "initialize month events"; payload: { monthEvents: IDayEvents[] } }
  | { type: "delete event"; payload: { id: number } };
interface IDayEventsCalendarReducerState {
  currentMonthName: string;
  monthEvents: IDayEvents[];
  currentYear: number;
}

export function reducer(
  state: IDayEventsCalendarReducerState,
  action: Action
): IDayEventsCalendarReducerState {
  console.log(action.type);
  switch (action.type) {
    case "go to prev month":
      const prevMonth = moment()
        .year(state.currentYear)
        .month(state.currentMonthName)
        .subtract(1, "months");
      return {
        ...state,
        currentYear: prevMonth.year(),
        currentMonthName: getMonthName(prevMonth),
      };
    case "go to next month":
      const nextMonth = moment()
        .year(state.currentYear)
        .month(state.currentMonthName)
        .add(1, "month");

      return {
        ...state,
        currentYear: nextMonth.year(),
        currentMonthName: getMonthName(nextMonth),
      };
    case "clear month events":
      return {
        ...state,
        monthEvents: [],
      };
    case "delete event":
      return {
        ...state,
        monthEvents: state.monthEvents.map((dayEvent) => {
          return {
            ...dayEvent,
            events: dayEvent.events.filter(
              (event) => Number(event.id) !== Number(action.payload.id)
            ),
          };
        }),
      };
    case "initialize month events":
      return {
        ...state,
        monthEvents: action.payload.monthEvents || [],
      };
    case "go to current month":
      const today = moment();
      return {
        ...state,
        currentYear: today.year(),
        currentMonthName: getMonthName(today),
      };
    case "add event on day":
      const updatedMonthEvents = getUpdatedMonthEvents({
        monthEvents: state.monthEvents,
        newEvent: action.payload.newEvent,
        currentMonthName: state.currentMonthName,
        currentYear: state.currentYear,
      });
      return { ...state, monthEvents: updatedMonthEvents };
    default:
      return state;
  }
}
