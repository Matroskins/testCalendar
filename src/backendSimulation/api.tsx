import { IDayEvents, IDayEvent, IAllEvents } from "../components/models";
import { getMonthName, getUpdatedMonthEvents } from "../components/utils";
import { getAllEventsWithUpdated } from "../components/eventsCalendar/context/utils";

export function getMonthEventsFromStorage_api<Y, M>({
  currentYear,
  currentMonthName,
}: {
  currentYear: number;
  currentMonthName: string;
}): IDayEvents[] {
  const allEvents = JSON.parse(localStorage.getItem("allEvents"));
  return allEvents?.[currentYear]?.[currentMonthName] || [];
}
const getMonthEventsWithoutEvent = (
  monthEvents: IDayEvents[],
  eventToRemove: IDayEvent
) => {
  return monthEvents
    .map((dayEvent) => ({
      ...dayEvent,
      events: dayEvent.events.filter(
        (event) => event.id !== eventToRemove.event.id
      ),
    }))
    .filter((dayEvent) => !!dayEvent.events.length);
};
export const getAllEvents_api = (): IAllEvents =>
  JSON.parse(localStorage.getItem("allEvents"));

export const setAllEvents_api = (allEvents: IAllEvents): void =>
  localStorage.setItem("allEvents", JSON.stringify(allEvents));

export const deleteEvent_api = (eventToRemove: IDayEvent) => {
  const monthEvents = getMonthEventsFromStorage_api({
    currentYear: eventToRemove.date.year(),
    currentMonthName: getMonthName(eventToRemove.date),
  });
  const monthEventsWithoutEvent = getMonthEventsWithoutEvent(
    monthEvents,
    eventToRemove
  );

  const allEventsUpdated = getAllEventsWithUpdated(
    monthEventsWithoutEvent,
    eventToRemove.date.year(),
    getMonthName(eventToRemove.date),
    eventToRemove,
    getAllEvents_api()
  );
  setAllEvents_api(allEventsUpdated);
};
export const clearAllEvents_api = () => localStorage.clear();

export const addEventOnDay_api = (
  newEvent: IDayEvent,
  currentMonthName: string,
  currentYear: number
) => {
  const monthEvents = getMonthEventsFromStorage_api({
    currentYear: newEvent.date.year(),
    currentMonthName: getMonthName(newEvent.date),
  });

  const monthEventsWithNewEvent = getUpdatedMonthEvents({
    monthEvents,
    newEvent,
    currentMonthName,
    currentYear,
  });
  // console.log(monthEvents, monthEventsWithNewEvent);
  const allEventsUpdated = getAllEventsWithUpdated(
    monthEventsWithNewEvent,
    newEvent.date.year(),
    getMonthName(newEvent.date),
    newEvent,
    getAllEvents_api()
  );
  setAllEvents_api(allEventsUpdated);
};
