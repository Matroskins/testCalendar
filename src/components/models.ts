import { Moment } from "moment";

export interface IEventData {
  hoursMinutes: Moment;
  title: string;
  description: string;
  id: number;
}
export interface IDayEvent {
  date: Moment;
  event: IEventData;
}
export interface IDayEvents {
  date: Moment;
  events: IEventData[];
}

export interface ICoordinate {
  x: number | null;
  y: number | null;
}

export interface IAllEvents {
  [yearKey: number]: {
    [monthName: string]: IDayEvents[];
  };
}
