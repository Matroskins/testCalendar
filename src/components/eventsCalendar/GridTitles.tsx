import React, { FC } from "react";

interface IGridTitlesProps {
  titles: string[];
}

export const GridTitles: FC<IGridTitlesProps> = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {props.titles.map((title, ind) => {
        return (
          <div key={ind} style={{ width: 85, textAlign: "right" }}>
            <span>{title}</span>
          </div>
        );
      })}
    </div>
  );
};
