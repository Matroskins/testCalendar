import React, { useContext, FC, CSSProperties, ChangeEvent } from "react";
import { UiContext } from "../context";

interface ITextarea {
  value: string;
  additionalStyle?: CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (newText: ChangeEvent<{}>) => void;
}
const Textarea: FC<ITextarea> = (props) => {
  const { textarea: textareastyle } = useContext(UiContext);

  return (
    <textarea
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.disabled}
      style={{
        ...textareastyle,
        ...props.additionalStyle,
      }}
    />
  );
};

export default Textarea;
