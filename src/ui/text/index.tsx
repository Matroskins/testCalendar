import React, { useContext, FC, CSSProperties } from "react";
import { UiContext } from "../context";

interface ITitleProps {
  text: string;
  additionalStyle?: CSSProperties;
}

const Title: FC<ITitleProps> = ({ additionalStyle, text }) => {
  const { text: textStyle } = useContext(UiContext);

  return <span style={{ ...textStyle, ...additionalStyle }}>{text}</span>;
};

export default Title;
