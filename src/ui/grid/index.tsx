import React, { useMemo, FC, PropsWithChildren } from "react";
import { chunk } from "lodash";

interface ICalendarGridProps<T> {
  gridElements: T[];
  rowLength: number;
  elementGrid: FC<{ elementData: T; key: string | number }>;
}

export function Grid<ObjectType>({
  rowLength,
  gridElements,
  elementGrid,
}: PropsWithChildren<ICalendarGridProps<ObjectType>>) {
  const gridRows = useMemo(() => chunk(gridElements, rowLength), [
    gridElements,
    rowLength,
  ]);
  return (
    <div>
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
