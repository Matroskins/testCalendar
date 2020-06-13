import React, { useMemo, FC } from "react";
import { chunk } from "lodash";
import { IDayEvents } from "../../components/models";

type IGridElement = IDayEvents;

interface ICalendarGridProps {
  gridElements: IGridElement[];
  titels: string[];
  elementGrid: FC<{ elementData: IGridElement; key: string | number }>;
}

export const Grid: FC<ICalendarGridProps> = ({
  titels,
  gridElements,
  elementGrid,
}) => {
  const gridRows = useMemo(() => chunk(gridElements, titels.length), [
    gridElements,
    titels,
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
};
