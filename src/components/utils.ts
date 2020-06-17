import moment, { Moment } from "moment";
import { flow, curryRight } from "lodash";
import { IEventData, IDayEvents, IDayEvent } from "./models";

enum TUpdateMonthEvent {
  AddEvent = 1,
  DeleteEvent,
  UpdateEvent,
  Empty,
}

const getEventUpdateType = (
  monthEvents: IDayEvents[],
  newEvent: IDayEvent,
  currentMonthName: string,
  currentYear: number
): TUpdateMonthEvent => {
  const checkIsDeleteEvent = (): TUpdateMonthEvent => {
    return currentMonthName === getMonthName(newEvent.date) &&
      moment(newEvent.date).year() === currentYear
      ? TUpdateMonthEvent.Empty
      : TUpdateMonthEvent.DeleteEvent;
  };
  const checkIsUpdateEvent = (updateEventOperationName: TUpdateMonthEvent) => {
    return monthEvents.some((dayEvents) =>
      dayEvents.events.some((event) => event.id === newEvent.event.id)
    ) && TUpdateMonthEvent.Empty === updateEventOperationName
      ? TUpdateMonthEvent.UpdateEvent
      : updateEventOperationName;
  };
  const checkIsAddNewEvent = (updateEventOperationName: TUpdateMonthEvent) => {
    return !monthEvents.some((dayEvents) =>
      dayEvents.events.some((event) => event.id === newEvent.event.id)
    ) && TUpdateMonthEvent.Empty === updateEventOperationName
      ? TUpdateMonthEvent.AddEvent
      : updateEventOperationName;
  };

  return flow([checkIsDeleteEvent, checkIsUpdateEvent, checkIsAddNewEvent])();
};
export const createEvent = ({ date, event }: IDayEvent): IDayEvents => ({
  date,
  events: [event],
});
const checkIsEventDayChanged = (
  monthEvents: IDayEvents[],
  newEvent: IDayEvent
) => {
  return monthEvents.reduce((isChangedDay, dayEvents) => {
    const isEventInDay = dayEvents.events.some(
      (event) => event.id === newEvent.event.id
    );
    if (!isChangedDay && isEventInDay) {
      return moment(dayEvents.date).isSame(moment(newEvent.date), "day");
    }
    return isChangedDay;
  }, false);
};
const checkIsOnlyOneEventInDay = (
  monthEvents: IDayEvents[],
  newEvent: IDayEvent
) => {
  return (
    !monthEvents.some((event) =>
      moment(newEvent.date).isSame(moment(event.date, "day"))
    ) && !monthEvents.length
  );
};
const updateDayEvents = (
  dayEvents: IEventData[],
  event: IEventData
): IEventData[] => {
  console.log("updateDayEvents ");
  return dayEvents.some((dayEvent) => event.id === dayEvent.id)
    ? dayEvents.map((dayEvent) => {
        if (dayEvent.id === event.id) {
          return event;
        }
        return dayEvent;
      })
    : [...dayEvents, event];
};

const getMonthEventsWithAddedEvent = (
  monthEvents: IDayEvents[],
  newEvent: IDayEvent
): IDayEvents[] => {
  const checkIsTheSameDay = (dayEvent, newEvent) =>
    moment(dayEvent.date).isSame(moment(newEvent.date), "day");
  return !!monthEvents.length &&
    monthEvents.some((dayEvent) => checkIsTheSameDay(dayEvent, newEvent))
    ? monthEvents.map((dayEvent) =>
        checkIsTheSameDay(dayEvent, newEvent)
          ? { ...dayEvent, events: [...dayEvent.events, newEvent.event] }
          : dayEvent
      )
    : [...monthEvents, { date: newEvent.date, events: [newEvent.event] }];
};
const getMonthWithoutEvent = (
  monthEvents: IDayEvents[],
  removeEvent: IDayEvent
): IDayEvents[] => {
  return monthEvents.map((dayEvent) => ({
    ...dayEvent,
    events: dayEvent.events.filter(
      (event) => event.id !== removeEvent.event.id
    ),
  }));
};
export const getUpdatedMonthEvents = ({
  monthEvents,
  newEvent,
  currentMonthName,
  currentYear,
}: {
  monthEvents: IDayEvents[];
  newEvent: IDayEvent;
  currentMonthName: string;
  currentYear: number;
}): IDayEvents[] => {
  const eventUpdateType = getEventUpdateType(
    monthEvents,
    newEvent,
    currentMonthName,
    currentYear
  );
  switch (eventUpdateType) {
    case TUpdateMonthEvent.AddEvent:
      console.log("AddEvent");
      return getMonthEventsWithAddedEvent(monthEvents, newEvent);
    case TUpdateMonthEvent.DeleteEvent:
      return getMonthWithoutEvent(monthEvents, newEvent);
    case TUpdateMonthEvent.UpdateEvent:
      return flow([
        getMonthWithoutEvent,
        curryRight(getMonthEventsWithAddedEvent)(newEvent),
      ])(monthEvents, newEvent);
    default:
      console.log("monthEvents did not updated");
      return monthEvents;
  }
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
