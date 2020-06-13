import { has, set } from "lodash";
import { getAllEvents, setAllEvents } from "../../../backendSimulation/api";
import { IDayEvents, IDayEvent } from "../../models";

export const addUpdatedMonthEventsToAllEvents = (
  updatedMonthEvents: IDayEvents[],
  year: number,
  month: string,
  newEvent: IDayEvent
) => {
  let allEvents = getAllEvents();
  if (has(allEvents, `${year}.${month}`)) {
    allEvents[year][month] = updatedMonthEvents;
  } else {
    allEvents = set(allEvents, `${year}.${month}`, [
      { date: newEvent.date, events: [newEvent.event] },
    ]);
  }

  setAllEvents(allEvents);
};
