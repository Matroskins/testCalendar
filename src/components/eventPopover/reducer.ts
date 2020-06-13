import { Moment } from "moment";
import { IDayEvent, IEventData } from "../models";

type IEventField = "title" | "description" | "hoursMinutes";
interface IEventPopoverState {
  dayEvent: IDayEvent;
}

type Action =
  | {
      type: "on initialize event Popover";
      payload: { date: Moment; event?: IEventData };
    }
  | {
      type: "change field";
      payload: {
        updatedField: Partial<
          {
            [key in IEventField]: string;
          }
        >;
      };
    }
  | { type: "save event" }
  | { type: "close event popover" };

export const reducer = (state: IEventPopoverState, action: Action) => {
  switch (action.type) {
    case "on initialize event Popover":
      if (action.payload.event) {
        return {
          ...state,
          dayEvent: {
            date: action.payload.date,
            event: action.payload.event,
          },
        };
      }
      return {
        ...state,
        dayEvent: {
          date: action.payload.date,
          event: {
            id: Math.ceil(Math.random() * 1000),
            title: "",
            description: "",
          },
        },
      };
    case "change field":
      return {
        ...state,
        dayEvent: {
          ...state.dayEvent,
          event: { ...state.dayEvent.event, ...action.payload.updatedField },
        },
      };
    case "close event popover":
      return {
        ...state,
        dayEvent: null,
      };
    default:
      return state;
  }
};
