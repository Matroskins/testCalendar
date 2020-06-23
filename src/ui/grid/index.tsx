import React, { useMemo, FC, PropsWithChildren } from "react";
import { chunk } from "lodash";
import { IDayEvents } from "../../components/models";

type IGridElement = IDayEvents;

interface ICalendarGridProps<T> {
  gridElements: T[];
  titles: string[];
  elementGrid: FC<{ elementData: T; key: string | number }>;
}

export function Grid<ObjectType>({
  titles,
  gridElements,
  elementGrid,
}: PropsWithChildren<ICalendarGridProps<ObjectType>>) {
  const gridRows = useMemo(() => chunk(gridElements, titles.length), [
    gridElements,
    titles,
  ]);
  return (
    <div style={{ borderColor: "black" }}>
      {gridRows.map((gridRow, ind) => {
        return (
          <div style={{ display: "flex" }} key={ind}>
            {gridRow.map((gridElement, elementInd) => {
              return elementGrid({
                elementData: gridElement,
                key: elementInd,
              });
            })}
          </div>
        );
      })}
    </div>
  );
}
