import moment, { Moment } from "moment";
import { eachDayOfInterval } from "date-fns";
import { IDayEvents } from "../models";

const getDaysOfTheMonthWeeks = (monthName: string, year: number): Date[] => {
  const currentMonthName = moment().year(year).month(monthName);
  const monthLastDay = currentMonthName.clone().endOf("month");
  const monthFirstWeekFirstDay =
    currentMonthName.clone().startOf("month").format("dddd") === "Saturday"
      ? currentMonthName.clone().startOf("month")
      : currentMonthName.clone().startOf("month").startOf("week");

  return eachDayOfInterval({
    start: monthFirstWeekFirstDay.toDate(),
    end: monthLastDay.toDate(),
  });
};

export const getMonthDaysWithEvents = (
  monthEvents: IDayEvents[],
  currentMonthName: string,
  currentYear: number
): IDayEvents[] => {
  const daysOfTheMonthWeeks = getDaysOfTheMonthWeeks(
    currentMonthName,
    currentYear
  );
  return daysOfTheMonthWeeks.map((monthWeekDay) => {
    const eventsOfDay =
      monthEvents.find((dayEvent) =>
        moment(dayEvent.date).isSame(moment(monthWeekDay), "day")
      )?.events || [];
    return {
      date: moment(monthWeekDay).set({ hour: 0, minute: 0 }),
      events: eventsOfDay,
    };
  });
};

export const checkIsDayInMonth = (
  dayDate: Moment,
  currentMonthName: string
): boolean => {
  return moment(dayDate).format("MMMM") === currentMonthName;
};
