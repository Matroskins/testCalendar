import React, { useContext, FC, CSSProperties } from "react";
import { UiContext } from "../context";

interface ITitleProps {
  text: string;
  additionalStyle?: CSSProperties;
}

const Title: FC<ITitleProps> = ({ additionalStyle, text }) => {
  const { title } = useContext(UiContext);
  return <h1 style={{ ...title, ...additionalStyle }}>{text}</h1>;
};

export default Title;
