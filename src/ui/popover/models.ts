import { ICoordinate, IDayEvent } from "../../components/models";

export enum IPopoverNames {
  EventPopover = 1,
  EmptyPopover,
}

type TDayEventPopover = {
  name: IPopoverNames.EventPopover;
  dayEvent: IDayEvent;
};

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

interface ICoordinateState {
  coordinate: ICoordinate;
}
interface IPopover extends ICoordinateState {
  [IPopoverNames.EventPopover]: {
    dayEvent: IDayEvent;
  };
  [IPopoverNames.EmptyPopover]: {};
}

export type TPopover = RequireOnlyOne<
  IPopover,
  IPopoverNames.EventPopover | IPopoverNames.EmptyPopover
>;
