import moment, { Moment } from "moment";
import { IEventData, IDayEvents, IDayEvent } from "./models";

export const createEvent = ({ date, event }: IDayEvent): IDayEvents => ({
  date,
  events: [event],
});

const updateDayEvents = (
  dayEvents: IEventData[],
  event: IEventData
): IEventData[] => {
  return dayEvents.some((dayEvent) => event.id === dayEvent.id)
    ? dayEvents.map((dayEvent) => {
        if (dayEvent.id === event.id) {
          return event;
        }
        return dayEvent;
      })
    : [...dayEvents, event];
};

export const getUpdatedMonthEvents = ({
  monthEvents,
  newEvent,
}: {
  monthEvents: IDayEvents[];
  newEvent: IDayEvent;
}): IDayEvents[] => {
  if (
    !monthEvents.some((event) =>
      moment(newEvent.date).isSame(moment(event.date))
    ) &&
    !!monthEvents
  ) {
    return [...monthEvents, { date: newEvent.date, events: [newEvent.event] }];
  }
  return monthEvents.map((dayEvents) => {
    if (moment(dayEvents.date).isSame(newEvent.date)) {
      return {
        ...dayEvents,
        events: updateDayEvents(dayEvents.events, newEvent.event),
      };
    }
    return dayEvents;
  });
};

export const getMonthName = (date: Moment): string => {
  return date.format("MMMM");
};

export const getMonthEventsNumber = (monthEvents: IDayEvents[]): number => {
  return monthEvents.reduce((eventsNumber, dayEvents) => {
    return eventsNumber + dayEvents["events"].length;
  }, 0);
};

export const checkIsEventExist = (
  monthEvents: IDayEvents[],
  newDayEvent: IDayEvent
) => {
  return monthEvents.some((dayEvent) =>
    dayEvent.events.some((event) => event.id === newDayEvent.event.id)
  );
};
