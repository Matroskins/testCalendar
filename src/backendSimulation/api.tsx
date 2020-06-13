import { IDayEvents, IAllEvents } from "../components/models";

export function getMonthEventsFromStorage<Y, M>({
  currentYear,
  currentMonthName,
}: {
  currentYear: number;
  currentMonthName: string;
}): IDayEvents[] {
  const allEvents = JSON.parse(localStorage.getItem("allEvents"));
  return allEvents?.[currentYear]?.[currentMonthName] || [];
}

export const getAllEvents = (): IAllEvents =>
  JSON.parse(localStorage.getItem("allEvents"));

export const setAllEvents = (allEvents: IAllEvents): void =>
  localStorage.setItem("allEvents", JSON.stringify(allEvents));

export const clearAllEvents = () => localStorage.clear();
