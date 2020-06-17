import React, { useReducer, useCallback, FC } from "react";
import moment, { min } from "moment";
import { TPopover, IPopoverNames } from "./models";
// [IPopoverNames.EventPopover] | TPopover[IPopoverNames.EmptyPopover]
type TPopoverState = {
  popoverData: TPopover;
};
interface IPopoverContext {
  popoverData: TPopover;
  onClosePopover: () => void;
  onOpenPopover: (popoverData: TPopover) => void;
}

type Action =
  | { type: "open popover"; payload: { popoverData: TPopover } }
  | { type: "close popover" };

export const PopoverContext = React.createContext<IPopoverContext>({
  popoverData: {
    [IPopoverNames.EmptyPopover]: {
      // dayEvent: {
      //   date: moment(),
      //   event: { id: 34, title: "initia", description: "initial" },
      // },
    },
    coordinate: { y: null, x: null },
  },
  onClosePopover: () => console.log("method did not initialized"),
  onOpenPopover: () => console.log("method did not initialized"),
});

const reducer = (state: TPopoverState, action: Action) => {
  switch (action.type) {
    case "open popover":
      return {
        ...state,
        popoverData: action.payload.popoverData,
      };
    case "close popover":
      return {
        ...state,
        popoverData: {
          [IPopoverNames.EmptyPopover]: {},
          coordinate: { x: null, y: null },
        },
      };
    default:
      return state;
  }
};
export const PopoverProvider: FC<{}> = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    popoverData: {
      [IPopoverNames.EventPopover]: {
        dayEvent: {
          date: moment("00:00", "HHmm"),
          event: {
            id: 34,
            title: "initia",
            description: "initial",
            hoursMinutes: moment("00:00", "HHmm"),
          },
        },
      },
      coordinate: { y: null, x: null },
    },
  });
  const onOpenPopover = useCallback((popoverData: TPopover) => {
    dispatch({ type: "open popover", payload: { popoverData } });
  }, []);
  const onClosePopover = useCallback(() => {
    dispatch({ type: "close popover" });
  }, []);
  return (
    <PopoverContext.Provider
      value={{
        popoverData: state.popoverData,
        onClosePopover,
        onOpenPopover,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
};
