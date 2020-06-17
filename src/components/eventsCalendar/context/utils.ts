import { has, set } from "lodash";
import { IDayEvents, IDayEvent, IAllEvents } from "../../models";

export const getAllEventsWithUpdated = (
  updatedMonthEvents: IDayEvents[],
  year: number,
  month: string,
  newEvent: IDayEvent,
  allEvents: IAllEvents
): IAllEvents => {
  if (has(allEvents, `${year}.${month}`)) {
    allEvents[year][month] = updatedMonthEvents;
  } else {
    allEvents = set(allEvents, `${year}.${month}`, [
      { date: newEvent.date, events: [newEvent.event] },
    ]);
  }
  return allEvents;
};
