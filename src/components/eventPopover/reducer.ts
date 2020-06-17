import moment, { Moment } from "moment";
import { IDayEvent, IEventData } from "../models";

type IEventField = "title" | "description";
interface IEventPopoverState {
  dayEvent: IDayEvent;
}

type Action =
  | {
      type: "on initialize event Popover";
      payload: { date: Moment; event?: IEventData };
    }
  | {
      type: "change event text field";
      payload: {
        updatedField: Partial<
          {
            [key in IEventField]: string;
          }
        >;
      };
    }
  | {
      type: "change event date";
      payload: {
        newDate: Moment;
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
            ...state.dayEvent.event,
            id: Math.ceil(Math.random() * 1000),
            // hoursMinutes: state,
            // title: "",
            // description: "",
          },
        },
      };
    case "change event text field":
      return {
        ...state,
        dayEvent: {
          ...state.dayEvent,
          event: { ...state.dayEvent.event, ...action.payload.updatedField },
        },
      };
    case "change event date":
      return {
        ...state,
        dayEvent: {
          event: {
            ...state.dayEvent.event,
            hoursMinutes: action.payload.newDate,
          },
          date: action.payload.newDate,
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
