import React, { useContext, FC, CSSProperties, ChangeEvent } from "react";
import { UiContext } from "../context";

interface IInput {
  value: string;
  type: string;
  additionalStyle?: CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (newText: ChangeEvent<HTMLInputElement>) => void;
}
const Input: FC<IInput> = (props) => {
  const { input: inputstyle } = useContext(UiContext);

  return (
    <input
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.disabled}
      type={props.type}
      style={{
        ...inputstyle,
        ...props.additionalStyle,
      }}
    />
  );
};

export default Input;
