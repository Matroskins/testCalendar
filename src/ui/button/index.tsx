import React, { FC, CSSProperties, useContext } from "react";
import { UiContext } from "../context";

interface IButtonProps {
  onClick: () => void;
  text: string;
  additionalStyle?: CSSProperties;
}

const Button: FC<IButtonProps> = ({ onClick, text, additionalStyle = {} }) => {
  const { button: buttonStyle } = useContext(UiContext);
  return (
    <button onClick={onClick} style={{ ...buttonStyle, ...additionalStyle }}>
      {text}
    </button>
  );
};

export default Button;
